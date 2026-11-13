# 10-D｜FreeCAD 不用自己畫：執行 AI 生成的 Macro

> 目標：學會複製、執行、修改參數、保存 FreeCAD 原檔；先建立小型 LCD 開孔測試片。
> 注意：GitHub 上的 AI／Python 程式仍是程式碼，**執行前先閱讀來源與內容**。避免執行不明來源的檔案刪除、網路請求或系統命令。

## Step 1：在 Mac 安裝 FreeCAD

1. 進入 [FreeCAD 官方下載](https://www.freecad.org/downloads)。
2. 選擇對應 macOS／Apple Silicon 的安裝版本，依官方說明安裝。
3. 第一次開啟後可以先不熟悉草圖工具，我們主要使用 **Macro（巨集）** 自動建立模型。
4. 你不必在 FreeCAD 的 GUI 裡逐一手動畫出螺絲柱與開孔。

## Step 2：取得我們的測試程式

1. 開啟 GitHub：[LCD_Window_Test.FCMacro](../freecad/LCD_Window_Test.FCMacro)。
2. 在 GitHub 選 **Raw / Download raw file** 將純文字 \`.FCMacro\` 儲存在 Mac。
3. 如果瀏覽器下載成 .txt，請改回 \`.FCMacro\` 副檔名。
4. 這個腳本只有「矩形 LCD 開孔測試片＋可選的固定柱」，**沒有真正的 31031 實測數字，也不是正式外殼**。

## Step 3：讀懂最上方的參數

在文字編輯器中開啟，找到：

\`\`\`python
PCB_W = 45.0        # 教學假數字
PCB_H = 84.0        # 教學假數字
LCD_X = 8.0         # LCD 開窗相對 PCB 左下角的 X
LCD_Y = 14.0        # LCD 開窗相對 PCB 左下角的 Y
LCD_W = 29.0        # 開孔寬
LCD_H = 58.0        # 開孔高
MOUNT_HOLES = []    # 未量測，故不猜固定孔
\`\`\`

**這些不是本板的真實尺寸！** 收到主板後，先以實測結果替換。

## Step 4：執行 FreeCAD Macro

1. FreeCAD 選 **Macro → Macros…**（部分版本在 **Tools → Macros**）。
2. 按 **Create**（或 New）建立同名 Macro，複製下載檔內容到編輯器；也可把下載的 .FCMacro 放到 FreeCAD Macro 目錄後從清單開啟。
3. 儲存，回到 Macro 視窗，選該 Macro → **Execute**。
4. 程式會建立一個新文件 \`AI_Pet_LCD_Window_Test\`，其中有可視的開孔測試片。
5. 先用旋轉視角檢查外形與開孔，再用 **File → Save As** 存成 \`.FCStd\`。
6. 若出現 Python 錯誤，開啟 **View → Panels → Python console** 查看訊息，回傳錯誤文字給 AI 修正。

注意：不要將 AI 腳本視為已經在這台 Mac 及你的 FreeCAD 版本實測通過；若 FreeCAD 顯示不同功能表，依當前版本調整。

## Step 5：用一句話改參數再重建

例如：

> 請把 LCD_Window_Test.FCMacro 的 PANEL_MARGIN 從 6 mm 改成 8 mm、PANEL_T 從 2.5 mm 改成 3 mm，其他未量測尺寸不要更動。請給我完整更新版 Macro，並指出改動前後的影響。

重新執行前，先保存上一版 .FCStd。Macro 會建立新文件；若執行多次請注意文件名稱自動變更，勿誤認覆寫成功。

## Step 6：匯出 STL

1. FreeCAD 模型樹中**選取實際要列印的實體（TestPlate）**，不是把所有參考零件一併匯出。
2. File → Export，格式選 STL Mesh (*.stl)；確認**毫米尺寸**與輸出位置。
3. 匯出後，用 Bambu Studio 打開 STL，再確認尺寸沒有被縮放。
4. **不要**把尚未量測的教學假尺寸 STL 放到 \`printable/\` 當正式可用模型。

## 驗收

- [ ] 能下載、閱讀並執行 Macro（未亂改系統設定）
- [ ] 看得到 LCD 矩形開孔測試片
- [ ] 改 1 個參數後重新生成模型
- [ ] 保存 .FCStd 並匯出一個只供練習的 STL
- [ ] 直到實際量測成功前，沒有把試片認作正式 PCB 支架

**下一步：** [10-E｜完整可拆外殼結構](05_外殼分件與裝配檢查.md)
