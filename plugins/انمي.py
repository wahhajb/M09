from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__)

def download_episode(anime_name, episode_number):
    url = f"https://www.anime-slayer.com/{anime_name}/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    episode_links = soup.find_all("a", class_="download")
    if episode_links:
        episode_link = episode_links[episode_number - 1]["href"]
        episode_title = episode_links[episode_number - 1].text.strip()
        download_file(episode_link, f"{anime_name}_{episode_title}.mp4")
        return f"تم تحميل الحلقة: {episode_title}"
    else:
        return "عذرًا، لم أتمكن من العثور على الحلقة."

def download_file(url, file_name):
    with requests.get(url, stream=True) as r:
        with open(file_name, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)

@app.route("/whatsapp", methods=["POST"])
def whatsapp():
    incoming_msg = request.values.get("Body", "").strip().split()
    response = MessagingResponse()
    msg = response.message()

    if incoming_msg:
        if incoming_msg[0].lower() == "انمي":
            anime_name = "-".join(incoming_msg[1:])
            episode_number = int(incoming_msg[-1]) if incoming_msg[-1].isdigit() else 1
            download_result = download_episode(anime_name, episode_number)
            msg.body(download_result)
        elif incoming_msg[0].lower() == "نقطة":
            msg.body("أدخل 'انمي' ثم اسم الأنمي ورقم الحلقة المراد تنزيلها.")
        else:
            msg.body("اعتذر، لم أفهم الطلب. يرجى استخدام 'نقطة' للمساعدة.")

    else:
        msg.body("يرجى إرسال الأمر المطلوب.")

    return str(response)

if __name__ == "__main__":
    app.run(debug=True)
