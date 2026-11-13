# 3D 設計工作區

本目錄存放 AI 手掌型寵物的工程設計、尺寸、外觀及Bambu Lab P2S 列印交付資料。**目前僅有設計規格與模板，尚無實測 CAD／STL。**

## 第一次開始：不用先學手動畫圖

先開 **[3D 互動工作坊](guide/index.html)**，依次完成照片、量測、AI 提示詞與 FreeCAD Macro。每步都提供詳細 [10-A～10-H 圖文教材](tutorials/README.md)。

- [3D 實作工作坊](guide/index.html)
- [原廠資料與照片](tutorials/01_照片蒐集與原廠模型.md)
- [量測座標與尺寸表](tutorials/02_尺寸量測與座標.md)
- [AI 提示詞與 FreeCAD 操作](tutorials/03_AI生成建模規格與提示詞.md)
- [FreeCAD 可修改測試片 Macro](freecad/LCD_Window_Test.FCMacro)
- [ABS / P2S 打樣與回修](tutorials/07_ABS試印回修循環.md)

原廠 [Waveshare 3D Structure](https://docs.waveshare.com/ESP32-S3-LCD-1.47B/Resources-And-Documents) 優先於手工從照片重建；仍需核對實際板型版本。

## 目錄規劃

```text
3d-design/
├── README.md
├── guide/                        # 互動式 HTML 工作坊
├── tutorials/                    # 10-A～10-H 詳細操作教學
├── freecad/                      # AI 建模 Macro 範例
├── specs/
│   └── measurements.md           # 主板、螢幕、馬達、孔位的量測表
├── cad/                           # FreeCAD 原生 .FCStd、STEP（模型完成後建立）
├── scripts/                       # OpenSCAD／Python 參數化腳本（有需要時）
├── blender/                       # .blend 外觀模型（第二階段）
├── printable/                     # 實際送印 STL／3MF（試裝通過後）
└── assembly/
    └── printing-requirements.md   # P2S 打樣與驗收規格
├── printing/
│   ├── P2S-print-workflow.md      # Bambu Studio + 公司 P2S 實作流程
│   └── ABS-material-guide.md      # ABS 列印與安全注意
```

Git 不會追蹤空資料夾；有模型產生時再建立對應路徑，**不需要現在放假的 STL 佔位檔**。

## 固定決策

- 外觀：手掌大小、圓潤、可愛；初步約 95×80×80 mm，待量測。
- 正面不設電源孔；**USB-C 與獨立 5V 電源入口均位於背面**。
- 需可拆、可維修並預留雙 SG90 雙軸活動空間。
- **FreeCAD 是工程尺寸主檔**；Blender MCP 用於外觀設計，不能取代孔位／公差驗證。
- 使用**公司現有 Bambu Lab P2S** 自行打樣、修正、列印；不購買印表機。
- **材料已確認為 ABS**；其品牌／型號、設備許可、噴嘴及通風條件仍需確認。
- 任何公差、固定孔尺寸或列印適配都以**公司 P2S 實測打樣結果**為準；Bambu Studio 保存 .3mf 列印專案。

詳細流程：[Bambu Lab P2S 列印流程](printing/P2S-print-workflow.md)｜[ABS 材料專項](printing/ABS-material-guide.md)。
