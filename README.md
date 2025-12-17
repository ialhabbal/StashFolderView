# Preview
![img.png](static/images/img.png)
![img_2.png](static/images/img_2.png)
![img_1.png](static/images/img_1.png)

# Features
1. Folder-style browsing with a masonry (waterfall) image layout and favorites support.
2. Folder-level read, favorite and delete flags.
3. Integration with Stash to favorite images and videos.
4. Simple login interface.
5. Mobile-friendly layout.
6. Docker deployment support.
7. Dedicated views for favorite images and favorite folders.

# Installation:
In the directory where you want this program to run:
1. open a command window (CMD) then type:
2. git clone https://github.com/ialhabbal/StashFolderView.git
3. cd StashFolderView
4. python -m venv venv
5. cd venv
6. cd scripts
7. Activate
8. cd..
9. cd..
10. pip intall -r requirements.txt
11. pip install python-dotenv

# Deployment
## 1. Deploy Stash
If you don't already have Stash deployed, see the upstream project: https://github.com/stashapp/stash

## 2. Get a Stash API key
Configure your Stash account credentials and generate an API key.

## Configure the .env file (in the main folder)
open the .env file in notepad and fill the required information and save it.

BASE_URL=http://localhost:9999/
JUMP_URL=http://localhost:9999/
USERNAME=Type Your Username that you created in Stash
PASSWORD=Type Your Password that you created in Stash
API_KEY=Type Your API_Key that you created in Stash

## 3. Run stash-folder-view
```
Go the directory where you installed StashFolderView
1. cd StashFolderView
2. cd venv
3. cd scripts
4. Activate
5. cd..
6. cd..
7. flask run --host=0.0.0.0 --port=8000
```
# TODO (as per the developer)
1. Improve floating button behaviors (done)
2. Show favorite button in masonry grid (done)
3. Display favorite files and folders on home (done)
4. Improve login flow (done)
5. Folder icon list view (done)
6. Auto-scroll and highlight current folder on the left (done)
7. Separate favorites page (done)
8. Favorite-folder view page (done)
9. Left navigation pinning (removed)
10. Collapse read folders in left nav (done)
11. Make breadcrumb scrollable horizontally
12. Change floating button to go up one level when returning to top

Translated and adapted by ialhabbal