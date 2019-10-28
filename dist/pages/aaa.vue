<template>
  <form bindsubmit="submit">
    <view class="address">
      <view class="com-add">
        <view>姓名</view>
        <input placeholder="请输入收货人姓名" name="name" value="{{name}}" />
      </view>
      <view class="com-add">
        <view>电话</view>
        <input placeholder="请输入手机号码" name="phone" type="number" value="{{phone}}" />
      </view>
      <view class="com-add">
        <view>邮政编码</view>
        <input placeholder="请输入邮政编码" name="code" type="number" value="{{zipcode}}" />
      </view>
      <picker mode="region" bindchange="bindRegionChange" value="{{region}}">
        <view class="picker" wx:if="{{true}}">
          <text>所在地区</text>
          <view class="input-placeholder">请选择所在省份、城市、区县</view>
        </view>
        <view class="picker" wx:else>
          <text>所在地区</text>
          <view>{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
        </view>
      </picker>
      <view class="com-add">
        <view>详细地址</view>
        <input placeholder="请输入街道、楼牌号等详细地址" name="address" value="{{address}}" />
      </view>
    </view>

    <view class="set-address" bindtap="setAddress">
      <image wx:if="{{!flag}}" style="width: 48rpx;height: 48rpx;" src="/assets/img/image47.png" />
      <image wx:else style="width: 48rpx;height: 48rpx;" src="/assets/img/image46.png" />
      <text>设为默认收货地址</text>
    </view>

    <button hover-class="none" form-type="submit">保存</button>
  </form>
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '添加地址'
  };
  data = {
    flag: true,
    region: []
  };
  components = {};
  computed = {};
  methods = {
    // 切换是否选中默认地址
    setAddress() {
      this.setData({
        flag: !this.data.flag
      });
    },
    // 改变地区
    bindRegionChange: function(e) {
      this.setData({
        region: e.detail.value
      });
    },
    // 保存
    submit(e) {
      var that = this;
      var { address, code, name, phone } = { ...e.detail.value };
      if (!name) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        });
        return false;
      }
      if (phone.length != 11) {
        wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return false;
      }
      if (!code) {
        wx.showToast({
          title: '请输入邮政编码',
          icon: 'none'
        });
        return false;
      }
      if (!this.data.region.length) {
        wx.showToast({
          title: '请选择地区',
          icon: 'none'
        });
        return false;
      }
      if (!address) {
        wx.showToast({
          title: '请输入地址',
          icon: 'none'
        });
        return false;
      }
      // id存在 就是编辑地址 否则是添加新地址
      if (that.data.id) {
        app.ajax({
          url: api.addressUpdate,
          data: {
            id: that.data.id,
            name,
            phone,
            zipcode: code,
            province: that.data.region[0],
            city: that.data.region[1],
            area: that.data.region[2],
            address,
            is_default: that.data.flag ? '2' : '1'
          },
          success(res) {
            if (res.code == 200) {
              app.showToast1(
                res.msg,
                1500,
                function() {
                  wx.navigateBack(1);
                },
                'success'
              );
            } else {
              app.showToast1(res.msg);
            }
          }
        });
      } else {
        app.ajax({
          url: api.addressAdd,
          data: {
            name,
            phone,
            zipcode: code,
            province: that.data.region[0],
            city: that.data.region[1],
            area: that.data.region[2],
            address,
            is_default: that.data.flag ? '2' : '1'
          },
          success(res) {
            if (res.code == 200) {
              app.showToast1(
                res.msg,
                1500,
                function() {
                  wx.navigateBack(1);
                },
                'success'
              );
            } else {
              app.showToast1(res.msg);
            }
          }
        });
      }
    }
  };
  onLoad(options) {
    var that = this;
    // 传id进来就是改变地址 先请地址信息
    if (options.id) {
      app.ajax({
        url: api.addressOne,
        data: {
          id: options.id
        },
        success(res) {
          if (res.code == 200) {
            that.setData(res.data);
            that.setData({
              region: [res.data.province, res.data.city, res.data.area]
            });
          }
        }
      });
    }
  }
}
</script>

<style lang='less'>
page {
  background: #f9f9f9;
  font-size: 28rpx;
  color: #282828;
}
button {
  width: 690rpx;
  height: 88rpx;
  font-weight: bold;
  color: #fff;
  line-height: 88rpx;
  border-radius: 44rpx;
  background: #f2292d;
  text-align: center;
  position: fixed;
  bottom: 60rpx;
  left: 30rpx;
}
.address {
  margin-top: 10rpx;
  padding: 0 30rpx;
  background: #fff;
}

.com-add {
  display: flex;
  height: 88rpx;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
}
.com-add:last-child {
  border-bottom: none;
}
.com-add > view,
.picker text {
  width: 200rpx;
  color: #353535;
  font-weight: bold;
  font-size: 32rpx;
}
.com-add > input {
  flex: 1;
}
input-placeholder {
  color: #b2b2b2;
  font-size: 32rpx;
}
.set-address {
  display: flex;
  padding: 30rpx;
  color: #8e8e8e;
  font-size: 22rpx;
  align-items: center;
}
.picker {
  display: flex;
  height: 88rpx;
  align-items: center;
}
</style>
