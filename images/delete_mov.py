import os

folder = os.path.dirname(os.path.abspath(__file__))
count = 0
for f in os.listdir(folder):
    if f.lower().endswith('.mov'):
        try:
            os.remove(os.path.join(folder, f))
            print(f'已刪除：{f}')
            count += 1
        except Exception as e:
            print(f'無法刪除 {f}：{e}')
if count == 0:
    print('這個資料夾沒有 .mov/.MOV 檔案或已全部刪除！')
else:
    print(f'共刪除 {count} 個 MOV 檔案。')
