@echo off
cd /d "%~dp0"
echo Vendeze UI/UX review
echo Open http://127.0.0.1:8005/UI_UX_REVIEW.html in your browser.
echo Keep this window open while reviewing. Press Ctrl+C to stop the server.
python -m http.server 8005 --bind 127.0.0.1
pause
