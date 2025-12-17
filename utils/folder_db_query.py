import sqlite3


def init_db():
    conn1 = sqlite3.connect('data/folders.db')
    cursor = conn1.cursor()

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS folders (
                folder_id TEXT PRIMARY KEY,
                read_status INTEGER CHECK (read_status IN (0, 1)),
                like_status INTEGER CHECK (like_status IN (0, 1)),
                delete_status INTEGER CHECK (delete_status IN (0, 1))
            )
            ''')

    cursor.execute('''
            INSERT OR IGNORE INTO folders (folder_id, read_status, like_status, delete_status)
            VALUES ('favorites', 0, 0, 0)
        ''')

    conn1.commit()
    conn1.close()

def folder_status_process(folder_id, root_folders, folder_has_subfolders):
    # Folder status processing
    print(folder_id)
    print(root_folders)
    folder_details = {}
    conn1 = sqlite3.connect('data/folders.db')
    cursor = conn1.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS folders (
            folder_id TEXT PRIMARY KEY,
            read_status INTEGER CHECK (read_status IN (0, 1)),
            like_status INTEGER CHECK (like_status IN (0, 1)),
            delete_status INTEGER CHECK (delete_status IN (0, 1))
        )
        ''')


    # Handle read status of subfolders
    read_status = True
    # print(root_folders[1:])
    subfolder_id = root_folders[0]['folder_id']
    cursor.execute("SELECT read_status, like_status, delete_status FROM folders WHERE folder_id = ?",
                   (subfolder_id,))
    folder_data = cursor.fetchone()
    folder_details[subfolder_id] = {
        'read_status': folder_data[0],
        'like_status': folder_data[1],
        'delete_status': folder_data[2]
    }
    for folder in root_folders[1:]:
        subfolder_id = folder['folder_id']
        cursor.execute("SELECT read_status, like_status, delete_status FROM folders WHERE folder_id = ?",
                       (subfolder_id,))
        folder_data = cursor.fetchone()

        # If folder_data is None, insert a new entry
        if not folder_data:
            read_status = read_status and False
            cursor.execute(
                "INSERT INTO folders (folder_id, read_status, like_status, delete_status) VALUES (?, ?, ?, ?)",
                (subfolder_id, 0, 0, 0))
            folder_details[subfolder_id] = {'read_status': 0, 'like_status': 0, 'delete_status': 0}
        else:
            read_status = read_status and bool(int(folder_data[0]))
            folder_details[subfolder_id] = {
                'read_status': folder_data[0],
                'like_status': folder_data[1],
                'delete_status': folder_data[2]
            }

    # Query current folder_id status; insert a new row if missing
    cursor.execute("SELECT read_status, like_status, delete_status FROM folders WHERE folder_id = ?", (folder_id,))
    folder_data = cursor.fetchone()
    # print(read_status)
    # If folder_data is None, insert a new entry
    if not folder_data:
        if read_status:
            cursor.execute(
                "INSERT INTO folders (folder_id, read_status, like_status, delete_status) VALUES (?, ?, ?, ?)",
                (folder_id, 1, 0, 0))
            folder_details[folder_id] = {'read_status': 1, 'like_status': 0, 'delete_status': 0}
        else:
            cursor.execute("INSERT INTO folders (folder_id, read_status, like_status, delete_status) VALUES (?, ?, ?, ?)",
                           (folder_id, 0, 0, 0))
            folder_details[folder_id] = {'read_status': 0, 'like_status': 0, 'delete_status': 0}
    else:
        # If there are no subfolders, update status to read
        if read_status:
            cursor.execute("UPDATE folders SET read_status = 1 WHERE folder_id = ?", (folder_id,))
            folder_details[folder_id] = {
                'read_status': 1,
                'like_status': folder_data[1],
                'delete_status': folder_data[2]
            }
        else:
            folder_details[folder_id] = {
                'read_status': folder_data[0],
                'like_status': folder_data[1],
                'delete_status': folder_data[2]
            }
    # print(folder_details[folder_id])
    # print(folder_details)
    # Commit changes and close the connection
    conn1.commit()
    conn1.close()
    return folder_details
