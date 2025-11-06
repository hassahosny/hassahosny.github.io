import os
import re
import subprocess
import uuid # لإنشاء أسماء ملفات فريدة
import logging
import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from flask import (
    Flask, 
    request, 
    jsonify, 
    send_from_directory, 
    render_template # (مُعدل) سنعود لاستخدامه
)
from flask_cors import CORS

# --- إعداد الـ logging ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- إعدادات سبوتيفاي ---
SPOTIPY_CLIENT_ID = "bbf7ddcc1a06414b88150254adf0db4a"
SPOTIPY_CLIENT_SECRET = "ca27570fb7fa4511af747d1f46fc1515"

try:
    auth_manager = SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    logger.info("Spotify client authenticated successfully.")
except Exception as e:
    logger.error(f"Failed to authenticate with Spotify: {e}")
    sp = None

# --- إعداد Flask ---
app = Flask(__name__, template_folder='.') 
CORS(app) 

DOWNLOAD_FOLDER = os.path.join(os.getcwd(), "downloads")
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

# --- (مُعدل) الواجهة الرئيسية (عادت لخدمة الملف) ---
@app.route('/')
def index():
    """
    (مُعدل) عرض الواجهة الأمامية الحقيقية index.html.
    """
    return render_template('index.html') 

# --- (جديد) نقطة نهاية (API) لجلب معلومات الأغنية ---
@app.route('/api/get-info', methods=['POST'])
def get_info():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"message": "الرجاء إدخال رابط."}), 400

    is_spotify_link = 'spotify.' in url
    
    try:
        if is_spotify_link and sp:
            # --- منطق سبوتيفاي ---
            resolved_url = requests.head(url, allow_redirects=True, timeout=5).url
            sp_track_match = re.search(r'open\.spotify\.com/track/([a-zA-Z0-9]+)', resolved_url)
            if not sp_track_match:
                return jsonify({"message": "رابط سبوتيفاي غير صالح أو ليس لأغنية."}), 400
            
            track_info = sp.track(resolved_url)
            track_name = track_info['name']
            artist_name = track_info['artists'][0]['name']
            title = f"{track_name} - {artist_name}"
            return jsonify({"title": title})

        elif not sp and is_spotify_link:
            return jsonify({"message": "مشكلة في الاتصال بخدمة سبوتيفاي."}), 500

        else:
            # --- منطق يوتيوب (yt-dlp) ---
            if 'youtube.com/playlist' in url:
                return jsonify({"message": "عفواً، البلاي ليست غير مدعومة."}), 400
            
            # (جديد) استخدام yt-dlp لجلب العنوان فقط
            command = [
                'yt-dlp',
                '--get-title', # جلب العنوان فقط
                '-o', '%(title)s', # تنسيق الإخراج
                url
            ]
            result = subprocess.run(command, capture_output=True, text=True, timeout=60, encoding='utf-8')
            
            if result.returncode != 0:
                logger.error(f"yt-dlp (get-info) error: {result.stderr}")
                return jsonify({"message": "فشل في قراءة رابط يوتيوب."}), 500
            
            title = result.stdout.strip()
            return jsonify({"title": title})

    except Exception as e:
        logger.error(f"Error in get_info: {e}")
        return jsonify({"message": f"حدث خطأ عام: {e}"}), 500


# --- نقطة النهاية (API) للتحميل (تبقى كما هي تقريباً) ---
@app.route('/api/download', methods=['POST'])
def handle_download():
    """
    استقبال الرابط من الجافاسكريبت، تشغيل yt-dlp، وإرجاع رابط الملف.
    """
    data = request.json
    url = data.get('url')

    if not url:
        return jsonify({"message": "الرجاء إدخال رابط."}), 400

    download_source = None
    is_spotify_link = 'spotify.' in url
    track_name = "song" 
    artist_name = "download"

    # --- 1. تحليل الرابط ---
    # (ملاحظة: هذا الكود مكرر قليلاً من get-info، لكنه يضمن أن التحميل مستقل)
    if is_spotify_link and sp:
        try:
            resolved_url = requests.head(url, allow_redirects=True, timeout=5).url
            track_info = sp.track(resolved_url)
            track_name = track_info['name']
            artist_name = track_info['artists'][0]['name']
            search_query = f"{track_name} {artist_name}"
            download_source = f"ytsearch1:{search_query}"
            logger.info(f"Spotify link. Searching YouTube for: {search_query}")
        except Exception as e:
            logger.error(f"Error processing Spotify link: {e}")
            return jsonify({"message": f"حدث خطأ أثناء معالجة رابط سبوتيفاي: {e}"}), 500
    else:
        logger.info("Direct link detected.")
        download_source = url

    # --- 2. عملية التحميل ---
    
    unique_id = str(uuid.uuid4().hex[:10])
    output_filename = f"{unique_id}.mp3"
    output_template = os.path.join(DOWNLOAD_FOLDER, f"{unique_id}.%(ext)s")

    command = [
        'yt-dlp',
        '-x', 
        '--audio-format', 'mp3',
        '--audio-quality', '0',
        '-o', output_template, 
        download_source
    ]

    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=300, encoding='utf-8')

        if result.returncode != 0:
            logger.error(f"yt-dlp (download) error: {result.stderr}")
            error_message = result.stderr or "خطأ غير معروف من yt-dlp."
            return jsonify({"message": f"فشل التحميل: {error_message}"}), 500

        final_file_path = os.path.join(DOWNLOAD_FOLDER, output_filename)

        if not os.path.exists(final_file_path):
             logger.error(f"File not found after download: {final_file_path}")
             return jsonify({"message": "فشل التحميل ولم يتم العثور على الملف."}), 500

        logger.info(f"Successfully downloaded: {output_filename}")
        
        suggested_filename = f"{track_name} - {artist_name}.mp3".replace("/", "-").replace("\\", "-")
        
        return jsonify({
            "fileName": suggested_filename, 
            "fileUrl": f"/download/{output_filename}" 
        })

    except subprocess.TimeoutExpired:
        logger.warning(f"Download timed out for: {source_url}")
        return jsonify({"message": "استغرقت عملية التحميل وقتاً أطول من اللازم."}), 504
    except Exception as e:
        logger.error(f"General error in download process: {e}")
        return jsonify({"message": f"حدث خطأ عام: {e}"}), 500


# --- نقطة النهاية (API) لإرسال الملف ---
@app.route('/download/<filename>')
def download_file(filename):
    """
    إرسال الملف الذي تم تحميله إلى المتصفح.
    """
    logger.info(f"Serving file: {filename}")
    try:
        return send_from_directory(
            DOWNLOAD_FOLDER, 
            filename, 
            as_attachment=True 
        )
    except FileNotFoundError:
        return jsonify({"message": "لم يتم العثور على الملف. ربما تم حذفه؟"}), 404


# --- تشغيل الخادم ---
if __name__ == '__main__':
    print("\n--- خادم التحميل قيد التشغيل (نسخة 2.0) ---")
    print(f"1. تأكد من وجود مجلد 'downloads' في نفس المسار.")
    print(f"2. تأكد من وجود ملف 'index.html' (الجديد) في نفس المسار.")
    print("3. افتح http://127.0.g0.1:5000 في متصفحك.\n")
    app.run(host='0.0.0.0', port=5000, debug=True)

