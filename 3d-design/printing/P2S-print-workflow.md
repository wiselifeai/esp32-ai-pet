# Bambu Lab P2S｜AI 寵物外殼列印流程（v1.0）

更新：2026-11-13。**目前已確認公司有 Bambu Lab P2S，使用者規劃使用該設備列印；尚未確認實際安裝噴嘴、可用耗材、Bambu Studio 設定及公司使用規則。**

## 製造方式變更

原案「FreeCAD → Blender MCP → STL 委外列印」改為：

```text
電子零件實測（mm）
  → FreeCAD：尺寸、固定柱、螢幕開孔、雙軸伺服支架
  → Blender + Blender MCP：可愛圓潤外觀（選用）
  → 匯出各零件 STL，另保存 STEP／FCStd
  → Bambu Studio：選 P2S 列印機與實際耗材／噴嘴／底板
  → 保存 .3mf 切片專案、確認列印方向與支撐
  → 使用公司 P2S 先印小型尺寸測試件
  → 實體量測、修正參數 → 全套列印與組裝
```

**使用公司設備前先依公司列印機的使用規範取得許可並確認耗材配置。** 本 GitHub Repository 為 Public，請勿上傳公司帳號、內網 IP、裝置配對資訊或機密的列印設定。

## P2S 原廠已確認規格

| 項目 | 原廠公開規格 | 專案採用方式 |
|---|---|---|
| 技術 | FDM | 列印組裝式塑膠外殼 |
| 成形空間 | **256 × 256 × 256 mm** | 目前 95 × 80 × 80 mm 概念尺寸可容納，但尚未通過裝配實測 |
| 標準噴嘴 | **0.4 mm** | 先以現有設備的實際噴嘴為準；若就是標配，用 0.4 mm 設定 |
| 可選噴嘴 | 0.2／0.4／0.6／0.8 mm | 細部精度有需要且有設備才評估更換 |
| 可用耗材 | 包含 PLA、PETG 等 | **PLA 第一版試印；PETG 作為需要較高韌性時的候選** |
| 切片軟體 | Bambu Studio（提供 Mac 版） | 建議替代原先選用的 PrusaSlicer 作為主要切片工具 |
| 列印專案 | Bambu Studio 使用 .3mf 專案格式 | 保存 STL（幾何）與 .3mf（列印設定）兩種檔案 |

原廠參考：
- [Bambu Lab P2S 介紹](https://blog.bambulab.com/the-icon-redefined-meet-the-p2s-a-completely-reengineered-version-of-the-ultra-productive-p1-series/)
- [P2S 規格表（PDF）](https://store-test.bblcdn.com/s7/default/ce5ed546153740e5816c1aedd37da14a/spec.pdf)
- [Bambu Studio 官方下載（macOS）](https://bambulab.com/en/download/studio)

## 第一版切片策略（僅初始方案）

以公司現有 P2S 的噴嘴、底板、耗材為準；**不要直接覆蓋公司既有列印設定**。

1. Bambu Studio 中選擇機型 **P2S**，再確認噴嘴規格、底板、耗材配置與廠內預設 profile。
2. 第一版若用標配 0.4 mm 噴嘴與 PLA，可從 **0.20 mm 層高的官方相容預設**開始。不是強制參數；細節件需要時可再調細。
3. 外殼預估壁厚 **2～2.5 mm** 僅作 CAD 初始方向，並視固定柱強度、表面、裝配公差與切片結果調整。
4. 先做小件測試：PCB 支架／LCD 開孔 → USB-C 背面插拔孔 → 螺絲柱／固定扣 → SG90 支架。
5. 收到測試件後**用實物試裝、量測誤差**，再確定螺絲孔、卡扣公差，之後才全套列印。
6. 每件 STL 皆採 mm，避免在切片軟體不小心縮放。切片後檢查零件落在底板、薄壁、支撐、懸空、材料用量及列印時間。
7. 整組列印件驗證：USB-C／5V 接口**全部位於背面**、頭頸運動不干涉、外殼可拆卸維修、配線有防磨及拉力保護。

**注意：** 真正列印的噴嘴溫度、熱床溫度、列印速度及材料風扇，優先使用公司 P2S 已驗證的官方／廠內對應材料 Profile；沒有驗證以前不要假設通用數值適用。

## 版本化交付

```text
3d-design/
  specs/measurements.md                # PCB、LCD、USB、SG90 實測值
  cad/                                 # 未來放 FCStd / STEP
  blender/                             # 選用的 blend
  printable/                           # 經 CAD 驗證的各零件 STL
  printing/
    P2S-print-workflow.md              # 本流程
    (日後：p2s-trial-01.3mf)          # Bambu Studio 實際可用的列印設定專案
  assembly/printing-requirements.md    # 試印與驗收紀錄
```

實測、可編輯 CAD、STL 和 3MF 目前**尚未產生**。本文件是依已知機型整理的製作計畫，不代表已操作公司的機器。

## 下一個實作任務

拿到 ESP32-S3-LCD-1.47B-M 後，拍 PCB 正反面並量測 **PCB 長／寬／厚、螢幕有效區、固定孔中心距、USB-C 插頭突出空間**；將結果填入 [尺寸表](../specs/measurements.md)。接著用 FreeCAD 做「LCD 開孔＋PCB 固定柱」試印件，先不急著列印完整外殼。
