# ESP32 AI 手掌型桌上寵物 🤖

> 學習與開發專案 v1.1 ｜2026-11-12｜繁體中文  
> 主板：**Waveshare ESP32-S3-LCD-1.47B-M（SKU 31031）已購買**  
> 狀態：**準備進入 Lesson 01，其他周邊尚未確認購買。**

## 🌐 互動式 HTML 課程網站

**完整 11 堂課已建立：** [網站首頁](https://wiselifeai.github.io/esp32-ai-pet/)（需先完成 [GitHub Pages 發布設定](docs/10_互動網頁使用說明.md) 才能開啟）。

- [Lesson 01｜Hello Robot](lessons/01.html)
- [Lesson 02｜點亮 LCD](lessons/02.html)
- [Lesson 03｜表情與眨眼](lessons/03.html)
- [Lesson 04｜六軸感測器](lessons/04.html)
- [Lesson 05｜Wi-Fi 與 HTTPS](lessons/05.html)
- [Lesson 06｜LLM 回答顯示](lessons/06.html)
- [Lesson 07｜繁體中文字型](lessons/07.html)
- [Lesson 08｜I²S 音訊](lessons/08.html)
- [Lesson 09｜SG90 與 PCA9685](lessons/09.html)
- [Lesson 10｜3D 外殼設計](lessons/10.html)
- [Lesson 11｜整機整合](lessons/11.html)

每堂課有原理、實作任務、互動模擬、立即回饋測驗、實機驗收勾選與筆記；右上角可匯出／匯入 JSON 學習進度。進度存在目前瀏覽器，不自動同步至 GitHub。**模擬練習不等於實體 ESP32 已測試成功。**

## 想完成的作品

從完全零基礎起步，做出 **手掌大小**（概念尺寸高約95 × 寬80 × 深80 mm）、有可愛表情、能讀文字／語音聊天、會點頭轉頭的桌上型 AI 寵物。未來由 3D 列印製作可拆裝外殼，**所有電源入口安排在背面，正面不放電源孔。**

## 已確認設計條件

| 主題 | 內容 |
|---|---|
| 預算 | 電子零件總預算 NT$1,200，盡量含蝦皮運費；3D 列印另計 |
| 主控 | **ESP32-S3-LCD-1.47B-M / 31031**，內建 172×320 彩色 LCD |
| 開發環境 | MacBook Air M3 + Arduino IDE |
| 已購硬體 | **ESP32 主板** |
| 待規劃硬體 | INMP441、MAX98357A、帶線 8Ω/1W 喇叭、SG90×2、PCA9685（暫定） |
| 供電 | ESP32 使用自身 USB-C；兩顆 SG90 規劃獨立穩定 5V/2A，兩邊共地 |
| 外殼 | 可拆 3D 列印外殼，USB／5V 入口位於 **背面**；委託外部 3D 列印服務商製作 |
| 3D 工具 | **FreeCAD** 為工程尺寸主工具；必要時用 Blender + Blender MCP 做外觀；PrusaSlicer 選用 |
| 3D 交付 | 保留可編輯 FreeCAD 工程檔、STEP、各部件 STL、PDF 裝配圖；依實物量測後建立 |
| AI | 透過 Wi-Fi → 安全代理服務 → 外部 LLM；不在 ESP32 上跑大型 LLM |

## 現在優先做的事：不用再買零件

**里程碑 1：先讓 AI 的回答以文字出現在 LCD。** 這一階段只需已買的板子、USB-C 資料線、Wi-Fi；不用麥克風／喇叭。**優先上課順序：L01 → L02 → L05 → L06 → L07**；表情、六軸感測器可稍後補課。

| 課程 | 實作成果 |
|---|---|
| L01 | Arduino IDE、USB 上傳與 Serial 印出 Hello |
| L02 | 用原廠 LVGL 範例讓 LCD 出現文字 |
| L03 | 表情／眨眼動畫 |
| L04 | 板上六軸感測器 |
| L05 | Wi-Fi、HTTPS、Serial 接收遠端文字 |
| **L06** | **向 LLM 發問 → 接收回覆 → LCD 顯示文字** |
| L07 | 繁體中文字型與文字分頁 |
| L08～L11 | 音訊、伺服馬達、3D 外殼與整機整合 |

⚠️ LLM 回覆先用**簡短英文**確認功能；LVGL 預設字型可能無法直接顯示繁體中文，L07 再補中文字型。**API Key 和 Wi-Fi 密碼絕不提交 GitHub**；付費 API 的金鑰應放在 Cloudflare Worker Secret，且先做好端點認證、用量限制與費用控制。

## 文件索引

- [BOM 蝦皮採購清單](docs/01_BOM_採購清單.md)
- [主板與硬體架構](docs/02_硬體架構.md)
- [供電與安全](docs/03_供電與安全.md)
- [3D 列印外殼規格](docs/04_3D外殼需求.md)
- **[3D 工具與外包列印流程](docs/11_3D工具與外包列印流程.md)**
- [3D 設計工作區](3d-design/README.md)
- [零件實測尺寸表](3d-design/specs/measurements.md)
- [列印廠商需求與驗收表](3d-design/assembly/printing-requirements.md)
- [Lesson 01：Hello Robot](docs/05_Lesson01_開始實作.md)
- [完整學習路線](docs/06_開發路線圖.md)
- [決策與待確認](docs/07_決策與待確認.md)
- [官方參考資料](docs/08_參考連結.md)
- [互動網頁使用與 GitHub Pages 設定](docs/10_互動網頁使用說明.md)
- **[Lesson 06：串接 LLM 文字顯示](docs/09_Lesson06_LLM文字顯示.md)**

## 目前進度

- [x] 設定產品方向與硬體預算
- [x] 決定背面供電與可列印外殼
- [x] 3D 製作方式確定為外包列印；選定 FreeCAD + Blender MCP（外觀）工具分工
- [x] **主板已購買**
- [x] 規劃 LLM → LCD 文字課程
- [ ] 主板到貨，完成 L01～L02
- [ ] 完成 Wi-Fi／LLM 文字回覆
- [ ] 補齊中文顯示
- [ ] 選定並驗證音訊／馬達規格
- [ ] 量測外殼尺寸，完成 3D 模型

> 專案所有教學、GPIO 與 API 方案目前是**規劃版**，尚未聲稱經實機驗證。每堂課成功後再更新進度。
