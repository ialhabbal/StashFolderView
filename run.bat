@echo off
REM Activate the virtual environment
call venv\Scripts\activate

REM Run Flask on all addresses, port 8000
flask run --host=0.0.0.0 --port=8000

REM Keep the window open after Flask exits
pause