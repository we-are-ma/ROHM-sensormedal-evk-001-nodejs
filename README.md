# ROHM-sensormedal-evk-001-nodejs

[sensormedal](https://github.com/hirotakaster/sensormedal) このライブラリについて整理して、メソッドの追加とサンプルコードを追加したもの

# 導入方法
`npm install rohm-sensormedal-evk-001-nodejs`

# サンプルコード

```(javascript)
var SensorMedal = require('rohm-sensormedal-evk-001-nodejs');

//スキャン開始 デバイス名,デバイスUUIDが指定できる
var device = {"NAME":"ROHM RAW",
            "UUID":"cf1f047b-4d71-4183-a5ea-4a779debcc7f"};
//const device = {"NAME":"ROHM RAW"};
//const device = {"UUID":"cf1f047b-4d71-4183-a5ea-4a779debcc7f"};            
SensorMedal.startScanning(device);

//接続したSensorMedalの情報を取得
SensorMedal.on('medaldata', function(result) {
  //console.dir(result.peripheral);
  console.dir(result.data);
});

//スキャン停止する場合
//SensorMedal.stopScanning();
```

# デバイス名やUUIDの情報
## デバイス名
ROHM RAW

## Service UUID, Characteristic UUID
| Service UUID | Characteristic UUID | R/W,Notification | 内容 |
|:-----------|:------------|:------------|:------------|
| 0179bbc0-0000-0100-8000-00805f9b34fb |  | SensorMedal-EVK-001 サービス |
|  | 0179bbc1-0000-0100-8000-00805f9b34fb | Read | |
|  | 0179bbc2-0000-0100-8000-00805f9b34fb | Write ||
|  | 0179bbc3-0000-0100-8000-00805f9b34fb | Notification | 加速度,地磁気,角速度,気圧 |
|  | 0179bbc4-0000-0100-8000-00805f9b34fb | --- ||

# 参考
[SensorMedal-EVK-001](https://www.rohm.co.jp/sensor-medal-support)
- ROHM 公式 SensorMedal-EVK-001 サイト
[ロームセンサメダルの使い方](https://www.rohm.co.jp/documents/11401/3946468/ROHMSensorMedal_Manual.pdf/054925df-01c9-4923-b599-4f9fdb2ab667)
- アドバタイズされているデータの参考になる資料
[sensormedal](https://github.com/hirotakaster/sensormedal)
- 参考にした ライブラリ

# Node.js のバージョンについて
node.js のバージョンによっては noble のインストールが上手くいかない。(`node-gyp rebuild`時にエラーとなる)  
nodebrew などを導入して バージョンを指定して環境を作る必要がありそう。  
[nodebrewでnode.jsのバージョン切り替え](https://qiita.com/teratsyk/items/51d64010cb341b54491b)

```
curl -L git.io/nodebrew | perl - setup #nodebrew インストール
nodebrew install v9.11.2 #9系の最後のバージョンをインストール
nodebrew use v9.11.2 #9系の最後のバージョンを有効にする
npm install
```