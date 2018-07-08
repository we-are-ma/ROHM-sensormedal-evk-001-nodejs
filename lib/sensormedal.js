/** SensorMedal と接続してデータを取得する
 * 
 * 参考
 * https://github.com/hirotakaster/sensormedal
 * ほぼこのコードを移植
 */

const noble = require('noble');
const util = require('util');
const events = require('events');

var SensorMedal = function() {
    noble.on('discover', this.onDiscover.bind(this));
};
util.inherits(SensorMedal, events.EventEmitter);

//サービスUUID
SensorMedal.prototype.SENSORMEDAL_SERVICES = "0179bbc0-0000-0100-8000-00805f9b34fb";

//センサーデータが通知されるキャラクタリスティック
SensorMedal.prototype.SENSORMEDAL_CHARACTERISTICS = "0179bbc3-0000-0100-8000-00805f9b34fb";

//スキャン対象のデバイス名,デバイスUUID など
SensorMedal.prototype.device = null;

/** スキャン開始
 * 
 */
SensorMedal.prototype.startScanning = function(device) {
    SensorMedal.prototype.device = device;
    if (noble.state === 'poweredOn') {
      var serviceUUID = SensorMedal.prototype.SENSORMEDAL_SERVICES.replace(/-/g,"").toLowerCase();
      noble.startScanning([serviceUUID], true);
      //noble.startScanning([], true);
    } else {
      noble.on('stateChange', function() {
        noble.startScanning([], true);
      });
    }
  };

  /* スキャン停止
  *
  */
  SensorMedal.prototype.stopScanning = function() {
    noble.stopScanning();
  };

  /* スキャンして周辺のBLEデバイスが見つかったとき
  */
  SensorMedal.prototype.onDiscover = function(peripheral) {
    var self = this;
    var uuid = peripheral.uuid;
    var localName = peripheral.advertisement.localName;
    //console.log("onDiscover",peripheral);

    //デバイス名が一致するか確認する
    if (typeof SensorMedal.prototype.device["NAME"] != "undefined"){
      var tmpName = SensorMedal.prototype.device["NAME"];
      //console.log("localName",localName,"tmpName",tmpName);
      if(localName == null){
          return;
      }
      else if (localName != tmpName) {
          return;
      }
    }

    //サービスUUIDが一致するか確認する
    if (typeof SensorMedal.prototype.device["UUID"] != "undefined"){
        var tmpUuid = SensorMedal.prototype.device["UUID"].replace(/-/g,"").toLowerCase();
        //console.log("uuid",uuid,"tmpUuid",tmpUuid);
        if (uuid != tmpUuid) {
            return;
        }
    }

    //スキャン停止
    noble.stopScanning();

    //接続後に サービス一覧を取得して 
    peripheral.connect(function(error) {
      const serviceUUID = SensorMedal.prototype.SENSORMEDAL_SERVICES.replace(/-/g,"").toLowerCase();
      const characteristicUUID = SensorMedal.prototype.SENSORMEDAL_CHARACTERISTICS.replace(/-/g,"").toLowerCase();
      //console.log("serviceUUID",serviceUUID);
      //console.log("characteristicUUID",characteristicUUID);
      peripheral.discoverServices([serviceUUID], function(error, services) {          
          var service = services[0];
          //console.log("discoverServices",service);
          service.discoverCharacteristics([characteristicUUID], function(error, characteristics) {
            var sensorDataCharacteristic = characteristics[0];
            
            //センサーデータが更新されると発生するイベント
            sensorDataCharacteristic.on('data', function(data, isNotification) {
              sensordata = {};
              //加速度
              sensordata.acceleration_x = data.readInt16LE(0);
              sensordata.acceleration_y = data.readInt16LE(2);
              sensordata.acceleration_z = data.readInt16LE(4);
              //地磁気
              sensordata.magnetism_x = data.readInt16LE(6);
              sensordata.magnetism_y = data.readInt16LE(8);
              sensordata.magnetism_z = data.readInt16LE(10);
              //角速度
              sensordata.angular_x = data.readInt16LE(12);
              sensordata.angular_y = data.readInt16LE(14);
              sensordata.angular_z = data.readInt16LE(16);
              //気圧
              sensordata.pressure = data.readUInt16LE(18);
              
              var result = {"peripheral":peripheral,"data":sensordata};
              self.emit('medaldata', result);
            });

            //データ更新通知の受け取りを開始 on('data',callback) が呼ばれるようになる
            sensorDataCharacteristic.notify(true, function(error) {
            });
          });

        });
    });
  };
  
  module.exports = SensorMedal;