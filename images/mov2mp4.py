import os
import subprocess

# 設定要轉檔的資料夾（預設為腳本所在資料夾）
folder = os.path.dirname(os.path.abspath(__file__))

# 找出所有 .mov/.MOV 檔案（不分大小寫）
mov_files = [f for f in os.listdir(folder) if f.lower().endswith('.mov')]

if not mov_files:
    print('這個資料夾沒有 .mov 檔案！')
    exit(0)

print(f'找到 {len(mov_files)} 個 MOV 檔案：')
for f in mov_files:
    print(' -', f)

ffmpeg_path = r'D:\PYTHON-pretice\DreamakerCarDetaling\ffmpeg-7.1.1-essentials_build\bin\ffmpeg.exe'

for mov_file in mov_files:
    mp4_file = os.path.splitext(mov_file)[0] + '.mp4'
    if os.path.exists(mp4_file):
        print(f'{mp4_file} 已經存在，略過...')
        continue
    print(f'正在轉檔 {mov_file} → {mp4_file} ...')
    # 執行 ffmpeg 轉檔
    result = subprocess.run([
        ffmpeg_path, '-i', mov_file, '-vcodec', 'libx264', '-acodec', 'aac', '-strict', 'experimental', mp4_file
    ])
    if result.returncode == 0:
        print(f'轉檔完成：{mp4_file}')
    else:
        print(f'轉檔失敗：{mov_file}')

print('全部轉檔完成！')
