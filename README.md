# Devices Faker cho Đồ án đa ngành

## Thiết đặt trong file .env
1. **MQTT_SERVER**: link tới server EMQX `tcp://0.0.0.0:1883/mqtt`
2. **SOIL_MOISTURE**: số lượng cảm biết độ ẩm đất
3. **GPS**: số lượng gps
4. **TIME_CHANGE**: thời gian thay đổi thông số cảm biết `ms`
5. **TIME_SEND**: thời gian gửi định kỳ
6. **SUBCRIBE_TOPIC**: topic thiết bị gửi thông tin
7. **PUBLISH_TOPIC**: topic thiết bị nhận thông tin

## Sau khi thiết đặt
1. install dependencies: `yarn install`
2. run test : `npm run test` hoặc`yarn run test`
## Run
1. với `nodemon`: `npm run dev` hoặc `yarn run dev`
2. với `node`: `npm start` hoặc `yarn start`

## Tính năng fake thông số  GPS, SoilMoisture
## Tính năng subcribe topic T_4 thay đổi thông số motor
## Dashboard ở  `localhost:8888`
