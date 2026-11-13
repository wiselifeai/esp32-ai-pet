# Lesson 10｜AI 建模與 ABS 外殼完整自學教材

**已確定：** FreeCAD +（選用 Blender MCP）+ Bambu Studio + 公司 Bambu Lab P2S／ABS。

最推薦的上課方式是先開 **[3D 互動實作工作坊](../guide/index.html)**，在那裡輸入量測數字、產生 AI 提示詞、下載 FreeCAD Macro、計算試印誤差，然後搭配下方詳細教材操作。

| 關卡 | 你需要做什麼 | 產出與驗收 | 詳細文件 |
|---|---|---|---|
| 10-A | 原廠 3D Structure、正背面／側面／USB 插線照片 | 照片＋可用原廠資料 | [照片蒐集與原廠模型](01_照片蒐集與原廠模型.md) |
| 10-B | 卡尺量 PCB、LCD、USB 與孔位；統一 mm 座標 | 有來源的尺寸表 | [尺寸量測與座標](02_尺寸量測與座標.md) |
| 10-C | 附照片與尺寸，請 AI 產生可編輯的 CAD 規格 | 參數／不確定清單／腳本需求 | [AI 建模規格與提示詞](03_AI生成建模規格與提示詞.md) |
| 10-D | 在 FreeCAD 執行 Macro，改參數並重新生成 | LCD 開窗測試片的 FCStd／練習 STL | [FreeCAD 操作](04_FreeCAD執行與修正.md) |
| 10-E | 請 AI 設計前後殼、主體、雙馬達支架 | 外殼分件／干涉檢查 | [裝配設計](05_外殼分件與裝配檢查.md) |
| 10-F | Bambu Studio 選 P2S + ABS、切片、試印 | ABS 試印件／3MF／列印紀錄 | [Bambu Studio / ABS](06_BambuStudio_ABS列印.md) |
| 10-G | 實際卡尺驗證，叫 AI 修改尺寸並重印 | 修正前後尺寸／V2 測試 | [試印回修](07_ABS試印回修循環.md) |
| 10-H | 整理 CAD、STL、3MF、裝配資料 | 可重印的工程資料包 | [正式交付](08_版本管理與最終交付.md) |

## 重要觀念

**不需要從零手動畫 FreeCAD。** 最佳路徑是「原廠結構檔（優先）＋實物照片＋卡尺量測 → AI 產生 FreeCAD 可重跑 Macro → 修改參數 → STL → P2S ABS 試印」。

但**不是照片自動變成精密、可列印的真實 CAD**。照片用來辨識外觀及方向；螺絲孔／USB／LCD 的工程尺寸以原廠幾何或實測為準。

## 可立即操作的教材資源

- [互動實作工作坊](../guide/index.html)（桌機／手機響應式）
- [FreeCAD LCD 開孔測試片 Macro](../freecad/LCD_Window_Test.FCMacro)（內含**教學假尺寸**；不可直接視為正式 31031 版本）
- [電子零件量測表](../specs/measurements.md)
- [Bambu P2S 流程](../printing/P2S-print-workflow.md)
- [ABS 材料安全](../printing/ABS-material-guide.md)

## 現在應做哪件事

先完成 **10-A**：Waveshare 官方下載 3D Structure，並拍主板正面、背面、側面和 USB-C 插線照片。拿到卡尺實際尺寸後再進入 10-B。設備尚未做任何正式列印驗證，課程中的 CAD 範例是入門測試用途。
