# 秋明司机助理

本系统前端主体为微信小程序，并结合了腾讯位置服务及短信插件等服务，包括周边维修、

紧急救援、动态路线规划、违章查询和保险服务四个模块

## 项目配置

下载项目后，从微信小程序开发工具中导入即可，本项目无后端代码

## 项目展示

从周边维修、紧急求援、动态路线规划、违章查询和保险服务四个模块来展示

### 周边维修

点击联系对方后，调用小程序的拨打电话api与维修点进行联系

点击维修点后，页面弹出窗口显示维修点的店名、位置、距离和联系

点击按钮后，通过腾讯位置服务api获取周边的维修点信息，并将每个维修点在map组件上进行标记

![image-20220914145604583](http://nas.wulei.pro:5543/2022/09/image-20220914145604583.png)

### 紧急救援

没有用户救援信息，则提醒用户填写紧急联系人信息，获取用户的姓名、年龄、血型、病史和紧急联系人联系方式，为紧急救援提供准备

将收集到的用户信息结合用户当前所在位置 通过短信api发送给紧急联系人

![image-20220914145807596](http://nas.wulei.pro:5543/2022/09/image-20220914145807596.png)

### 动态路线规划

基于腾讯位置服务插件，获得详细的路线，通过算法进行动态路线规划，获得驾车，公交，步行三种出行方案

![image-20220914145908424](http://nas.wulei.pro:5543/2022/09/image-20220914145908424.png)

### 违章查询和保险服务

通过获得用户的车牌号、车架号和发动机号，请求后端api服务，获得用户的违章信息，通过绑定车辆信息，方便后续直接查询。

![image-20220914150022305](http://nas.wulei.pro:5543/2022/09/image-20220914150022305.png)

向用户推荐九种不同的保险服务，方便让用户了解自己的需求，进行后续购买保险。

![image-20220914150049883](http://nas.wulei.pro:5543/2022/09/image-20220914150049883.png)
