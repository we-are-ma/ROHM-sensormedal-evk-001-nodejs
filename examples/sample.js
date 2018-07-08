"use strict";

const SensorMedal = require('../index');

//スキャン開始 デバイス名,デバイスUUIDが指定できる
//const device = {"NAME":"ROHM RAW","UUID":"cf1f047b-4d71-4183-a5ea-4a779debcc7f"};
const device = {"NAME":"ROHM RAW"};
//const device = {"UUID":"cf1f047b-4d71-4183-a5ea-4a779debcc7f"};
SensorMedal.startScanning(device);

//接続したSensorMedalの情報を取得
SensorMedal.on('medaldata', function(result) {
  //console.dir(result.peripheral);
  console.dir(result.data);
});

//スキャンを停止する場合
//SensorMedal.stopScanning();