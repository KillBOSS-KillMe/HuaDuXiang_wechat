'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QR = require('./qrcode.js');
var GD = require('./gradient.js');

var Painter = function () {
  function Painter(ctx, data) {
    _classCallCheck(this, Painter);

    this.ctx = ctx;
    this.data = data;
    this.globalWidth = {};
    this.globalHeight = {};
  }

  _createClass(Painter, [{
    key: 'paint',
    value: function paint(callback) {
      this.style = {
        width: this.data.width.toPx(),
        height: this.data.height.toPx()
      };
      this._background();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.data.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var view = _step.value;

          this._drawAbsolute(view);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.ctx.draw(false, function () {
        callback();
      });
    }
  }, {
    key: '_background',
    value: function _background() {
      this.ctx.save();
      var _style = this.style,
          width = _style.width,
          height = _style.height;

      var bg = this.data.background;
      this.ctx.translate(width / 2, height / 2);

      this._doClip(this.data.borderRadius, width, height);
      if (!bg) {
        // 如果未设置背景，则默认使用白色
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      } else if (bg.startsWith('#') || bg.startsWith('rgba') || bg.toLowerCase() === 'transparent') {
        // 背景填充颜色
        this.ctx.fillStyle = bg;
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      } else if (GD.api.isGradient(bg)) {
        GD.api.doGradient(bg, width, height, this.ctx);
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
      } else {
        // 背景填充图片
        this.ctx.drawImage(bg, -(width / 2), -(height / 2), width, height);
      }
      this.ctx.restore();
    }
  }, {
    key: '_drawAbsolute',
    value: function _drawAbsolute(view) {
      // 证明 css 为数组形式，需要合并
      if (view.css && view.css.length) {
        /* eslint-disable no-param-reassign */
        view.css = Object.assign.apply(Object, _toConsumableArray(view.css));
      }
      switch (view.type) {
        case 'image':
          this._drawAbsImage(view);
          break;
        case 'text':
          this._fillAbsText(view);
          break;
        case 'rect':
          this._drawAbsRect(view);
          break;
        case 'qrcode':
          this._drawQRCode(view);
          break;
        default:
          break;
      }
    }

    /**
     * 根据 borderRadius 进行裁减
     */

  }, {
    key: '_doClip',
    value: function _doClip(borderRadius, width, height) {
      if (borderRadius && width && height) {
        var r = Math.min(borderRadius.toPx(), width / 2, height / 2);
        // 防止在某些机型上周边有黑框现象，此处如果直接设置 fillStyle 为透明，在 Android 机型上会导致被裁减的图片也变为透明， iOS 和 IDE 上不会
        // globalAlpha 在 1.9.90 起支持，低版本下无效，但把 fillStyle 设为了 white，相对默认的 black 要好点
        this.ctx.globalAlpha = 0;
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI);
        this.ctx.lineTo(width / 2 - r, -height / 2);
        this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI);
        this.ctx.lineTo(width / 2, height / 2 - r);
        this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI);
        this.ctx.lineTo(-width / 2 + r, height / 2);
        this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        // 在 ios 的 6.6.6 版本上 clip 有 bug，禁掉此类型上的 clip，也就意味着，在此版本微信的 ios 设备下无法使用 border 属性
        if (!(getApp().systemInfo && getApp().systemInfo.version <= '6.6.6' && getApp().systemInfo.platform === 'ios')) {
          this.ctx.clip();
        }
        this.ctx.globalAlpha = 1;
      }
    }

    /**
     * 画边框
     */

  }, {
    key: '_doBorder',
    value: function _doBorder(view, width, height) {
      if (!view.css) {
        return;
      }
      var _view$css = view.css,
          borderRadius = _view$css.borderRadius,
          borderWidth = _view$css.borderWidth,
          borderColor = _view$css.borderColor;

      if (!borderWidth) {
        return;
      }
      this.ctx.save();
      this._preProcess(view, true);
      var r = void 0;
      if (borderRadius) {
        r = Math.min(borderRadius.toPx(), width / 2, height / 2);
      } else {
        r = 0;
      }
      var lineWidth = borderWidth.toPx();
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = borderColor || 'black';
      this.ctx.beginPath();
      this.ctx.arc(-width / 2 + r, -height / 2 + r, r + lineWidth / 2, 1 * Math.PI, 1.5 * Math.PI);
      this.ctx.lineTo(width / 2 - r, -height / 2 - lineWidth / 2);
      this.ctx.arc(width / 2 - r, -height / 2 + r, r + lineWidth / 2, 1.5 * Math.PI, 2 * Math.PI);
      this.ctx.lineTo(width / 2 + lineWidth / 2, height / 2 - r);
      this.ctx.arc(width / 2 - r, height / 2 - r, r + lineWidth / 2, 0, 0.5 * Math.PI);
      this.ctx.lineTo(-width / 2 + r, height / 2 + lineWidth / 2);
      this.ctx.arc(-width / 2 + r, height / 2 - r, r + lineWidth / 2, 0.5 * Math.PI, 1 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }
  }, {
    key: '_preProcess',
    value: function _preProcess(view, notClip) {
      var width = 0;
      var height = void 0;
      var extra = void 0;
      switch (view.type) {
        case 'text':
          {
            var textArray = view.text.split('\n');
            // 处理多个连续的'\n'
            for (var i = 0; i < textArray.length; ++i) {
              if (textArray[i] === '') {
                textArray[i] = ' ';
              }
            }
            var fontWeight = view.css.fontWeight === 'bold' ? 'bold' : 'normal';
            view.css.fontSize = view.css.fontSize ? view.css.fontSize : '20rpx';
            this.ctx.font = 'normal ' + fontWeight + ' ' + view.css.fontSize.toPx() + 'px ' + (view.css.fontFamily ? view.css.fontFamily : 'sans-serif');
            // this.ctx.setFontSize(view.css.fontSize.toPx());
            // 计算行数
            var lines = 0;
            var linesArray = [];
            for (var _i = 0; _i < textArray.length; ++_i) {
              var textLength = this.ctx.measureText(textArray[_i]).width;
              var partWidth = view.css.width ? view.css.width.toPx() : textLength;
              var calLines = Math.ceil(textLength / partWidth);
              width = partWidth > width ? partWidth : width;
              lines += calLines;
              linesArray[_i] = calLines;
            }
            lines = view.css.maxLines < lines ? view.css.maxLines : lines;
            var lineHeight = view.css.lineHeight ? view.css.lineHeight.toPx() : view.css.fontSize.toPx();
            height = lineHeight * lines;
            extra = {
              lines: lines,
              lineHeight: lineHeight,
              textArray: textArray,
              linesArray: linesArray
            };
            break;
          }
        case 'image':
          {
            // image的长宽设置成auto的逻辑处理
            var ratio = getApp().systemInfo.pixelRatio ? getApp().systemInfo.pixelRatio : 2;
            // 有css却未设置width或height，则默认为auto
            if (view.css) {
              if (!view.css.width) {
                view.css.width = 'auto';
              }
              if (!view.css.height) {
                view.css.height = 'auto';
              }
            }
            if (!view.css || view.css.width === 'auto' && view.css.height === 'auto') {
              width = Math.round(view.sWidth / ratio);
              height = Math.round(view.sHeight / ratio);
            } else if (view.css.width === 'auto') {
              height = view.css.height.toPx();
              width = view.sWidth / view.sHeight * height;
            } else if (view.css.height === 'auto') {
              width = view.css.width.toPx();
              height = view.sHeight / view.sWidth * width;
            } else {
              width = view.css.width.toPx();
              height = view.css.height.toPx();
            }
            break;
          }
        default:
          if (!(view.css.width && view.css.height)) {
            console.error('You should set width and height');
            return;
          }
          width = view.css.width.toPx();
          height = view.css.height.toPx();
          break;
      }
      var x = void 0;
      if (view.css && view.css.right) {
        if (typeof view.css.right === 'string') {
          x = this.style.width - view.css.right.toPx(true);
        } else {
          // 可以用数组方式，把文字长度计算进去
          // [right, 文字id, 乘数（默认 1）]
          var rights = view.css.right;
          x = this.style.width - rights[0].toPx(true) - this.globalWidth[rights[1]] * (rights[2] || 1);
        }
      } else if (view.css && view.css.left) {
        if (typeof view.css.left === 'string') {
          x = view.css.left.toPx(true);
        } else {
          var lefts = view.css.left;
          x = lefts[0].toPx(true) + this.globalWidth[lefts[1]] * (lefts[2] || 1);
        }
      } else {
        x = 0;
      }
      //const y = view.css && view.css.bottom ? this.style.height - height - view.css.bottom.toPx(true) : (view.css && view.css.top ? view.css.top.toPx(true) : 0);
      var y = void 0;
      if (view.css && view.css.bottom) {
        y = this.style.height - height - view.css.bottom.toPx(true);
      } else {
        if (view.css && view.css.top) {
          if (typeof view.css.top === 'string') {
            y = view.css.top.toPx(true);
          } else {
            var tops = view.css.top;
            y = tops[0].toPx(true) + this.globalHeight[tops[1]] * (tops[2] || 1);
          }
        } else {
          y = 0;
        }
      }

      var angle = view.css && view.css.rotate ? this._getAngle(view.css.rotate) : 0;
      // 当设置了 right 时，默认 align 用 right，反之用 left
      var align = view.css && view.css.align ? view.css.align : view.css && view.css.right ? 'right' : 'left';
      switch (align) {
        case 'center':
          this.ctx.translate(x, y + height / 2);
          break;
        case 'right':
          this.ctx.translate(x - width / 2, y + height / 2);
          break;
        default:
          this.ctx.translate(x + width / 2, y + height / 2);
          break;
      }
      this.ctx.rotate(angle);
      if (!notClip && view.css && view.css.borderRadius && view.type !== 'rect') {
        this._doClip(view.css.borderRadius, width, height);
      }
      this._doShadow(view);
      if (view.id) {
        this.globalWidth[view.id] = width;
        this.globalHeight[view.id] = height;
      }
      return {
        width: width,
        height: height,
        x: x,
        y: y,
        extra: extra
      };
    }

    // 画文字的背景图片

  }, {
    key: '_doBackground',
    value: function _doBackground(view) {
      this.ctx.save();

      var _preProcess2 = this._preProcess(view, true),
          rawWidth = _preProcess2.width,
          rawHeight = _preProcess2.height;

      var _view$css2 = view.css,
          background = _view$css2.background,
          padding = _view$css2.padding;

      var pd = [0, 0, 0, 0];
      if (padding) {
        var pdg = padding.split(/\s+/);
        if (pdg.length === 1) {
          var x = pdg[0].toPx();
          pd = [x, x, x, x];
        }
        if (pdg.length === 2) {
          var _x = pdg[0].toPx();
          var y = pdg[1].toPx();
          pd = [_x, y, _x, y];
        }
        if (pdg.length === 3) {
          var _x2 = pdg[0].toPx();
          var _y = pdg[1].toPx();
          var z = pdg[2].toPx();
          pd = [_x2, _y, z, _y];
        }
        if (pdg.length === 4) {
          var _x3 = pdg[0].toPx();
          var _y2 = pdg[1].toPx();
          var _z = pdg[2].toPx();
          var a = pdg[3].toPx();
          pd = [_x3, _y2, _z, a];
        }
      }
      var width = rawWidth + pd[1] + pd[3];
      var height = rawHeight + pd[0] + pd[2];
      this._doClip(view.css.borderRadius, width, height);
      if (GD.api.isGradient(background)) {
        GD.api.doGradient(background, width, height, this.ctx);
      } else {
        this.ctx.fillStyle = background;
      }
      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);

      this.ctx.restore();
    }
  }, {
    key: '_drawQRCode',
    value: function _drawQRCode(view) {
      this.ctx.save();

      var _preProcess3 = this._preProcess(view),
          width = _preProcess3.width,
          height = _preProcess3.height;

      QR.api.draw(view.content, this.ctx, -width / 2, -height / 2, width, height, view.css.background, view.css.color);
      this.ctx.restore();
      this._doBorder(view, width, height);
    }
  }, {
    key: '_drawAbsImage',
    value: function _drawAbsImage(view) {
      if (!view.url) {
        return;
      }
      this.ctx.save();

      var _preProcess4 = this._preProcess(view),
          width = _preProcess4.width,
          height = _preProcess4.height;
      // 获得缩放到图片大小级别的裁减框


      var rWidth = view.sWidth;
      var rHeight = view.sHeight;
      var startX = 0;
      var startY = 0;
      // 绘画区域比例
      var cp = width / height;
      // 原图比例
      var op = view.sWidth / view.sHeight;
      if (cp >= op) {
        rHeight = rWidth / cp;
        startY = Math.round((view.sHeight - rHeight) / 2);
      } else {
        rWidth = rHeight * cp;
        startX = Math.round((view.sWidth - rWidth) / 2);
      }
      if (view.css && view.css.mode === 'scaleToFill') {
        this.ctx.drawImage(view.url, -(width / 2), -(height / 2), width, height);
      } else {
        this.ctx.drawImage(view.url, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
      }
      this.ctx.restore();
      this._doBorder(view, width, height);
    }
  }, {
    key: '_fillAbsText',
    value: function _fillAbsText(view) {
      if (!view.text) {
        return;
      }
      if (view.css.background) {
        // 生成背景
        this._doBackground(view);
      }
      this.ctx.save();

      var _preProcess5 = this._preProcess(view, view.css.background && view.css.borderRadius),
          width = _preProcess5.width,
          height = _preProcess5.height,
          extra = _preProcess5.extra;

      this.ctx.fillStyle = view.css.color || 'black';
      var lines = extra.lines,
          lineHeight = extra.lineHeight,
          textArray = extra.textArray,
          linesArray = extra.linesArray;
      // 如果设置了id，则保留 text 的长度

      if (view.id) {
        var textWidth = 0;
        for (var i = 0; i < textArray.length; ++i) {
          textWidth = this.ctx.measureText(textArray[i]).width > textWidth ? this.ctx.measureText(textArray[i]).width : textWidth;
        }
        this.globalWidth[view.id] = width ? textWidth < width ? textWidth : width : textWidth;
      }
      var lineIndex = 0;
      for (var j = 0; j < textArray.length; ++j) {
        var preLineLength = Math.round(textArray[j].length / linesArray[j]);
        var start = 0;
        var alreadyCount = 0;
        for (var _i2 = 0; _i2 < linesArray[j]; ++_i2) {
          // 绘制行数大于最大行数，则直接跳出循环
          if (lineIndex >= lines) {
            break;
          }
          alreadyCount = preLineLength;
          var text = textArray[j].substr(start, alreadyCount);
          var measuredWith = this.ctx.measureText(text).width;
          // 如果测量大小小于width一个字符的大小，则进行补齐，如果测量大小超出 width，则进行减除
          // 如果已经到文本末尾，也不要进行该循环
          while (start + alreadyCount <= textArray[j].length && (width - measuredWith > view.css.fontSize.toPx() || measuredWith > width)) {
            if (measuredWith < width) {
              text = textArray[j].substr(start, ++alreadyCount);
            } else {
              if (text.length <= 1) {
                // 如果只有一个字符时，直接跳出循环
                break;
              }
              text = textArray[j].substr(start, --alreadyCount);
            }
            measuredWith = this.ctx.measureText(text).width;
          }
          start += text.length;
          // 如果是最后一行了，发现还有未绘制完的内容，则加...
          if (lineIndex === lines - 1 && (j < textArray.length - 1 || start < textArray[j].length)) {
            while (this.ctx.measureText(text + '...').width > width) {
              if (text.length <= 1) {
                // 如果只有一个字符时，直接跳出循环
                break;
              }
              text = text.substring(0, text.length - 1);
            }
            text += '...';
            measuredWith = this.ctx.measureText(text).width;
          }
          this.ctx.setTextAlign(view.css.textAlign ? view.css.textAlign : 'left');
          var x = void 0;
          switch (view.css.textAlign) {
            case 'center':
              x = 0;
              break;
            case 'right':
              x = width / 2;
              break;
            default:
              x = -(width / 2);
              break;
          }
          var y = -(height / 2) + (lineIndex === 0 ? view.css.fontSize.toPx() : view.css.fontSize.toPx() + lineIndex * lineHeight);
          lineIndex++;
          if (view.css.textStyle === 'stroke') {
            this.ctx.strokeText(text, x, y, measuredWith);
          } else {
            this.ctx.fillText(text, x, y, measuredWith);
          }
          var fontSize = view.css.fontSize.toPx();
          if (view.css.textDecoration) {
            this.ctx.beginPath();
            if (/\bunderline\b/.test(view.css.textDecoration)) {
              this.ctx.moveTo(x, y);
              this.ctx.lineTo(x + measuredWith, y);
            }
            if (/\boverline\b/.test(view.css.textDecoration)) {
              this.ctx.moveTo(x, y - fontSize);
              this.ctx.lineTo(x + measuredWith, y - fontSize);
            }
            if (/\bline-through\b/.test(view.css.textDecoration)) {
              this.ctx.moveTo(x, y - fontSize / 3);
              this.ctx.lineTo(x + measuredWith, y - fontSize / 3);
            }
            this.ctx.closePath();
            this.ctx.strokeStyle = view.css.color;
            this.ctx.stroke();
          }
        }
      }
      this.ctx.restore();
      this._doBorder(view, width, height);
    }
  }, {
    key: '_drawAbsRect',
    value: function _drawAbsRect(view) {
      this.ctx.save();

      var _preProcess6 = this._preProcess(view),
          width = _preProcess6.width,
          height = _preProcess6.height;

      if (GD.api.isGradient(view.css.color)) {
        GD.api.doGradient(view.css.color, width, height, this.ctx);
      } else {
        this.ctx.fillStyle = view.css.color;
      }
      var borderRadius = view.css.borderRadius;
      var r = borderRadius ? Math.min(borderRadius.toPx(), width / 2, height / 2) : 0;
      this.ctx.beginPath();
      this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI); //左上角圆弧
      this.ctx.lineTo(width / 2 - r, -height / 2);
      this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI); // 右上角圆弧
      this.ctx.lineTo(width / 2, height / 2 - r);
      this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI); // 右下角圆弧
      this.ctx.lineTo(-width / 2 + r, height / 2);
      this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI); // 左下角圆弧
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
      this._doBorder(view, width, height);
    }

    // shadow 支持 (x, y, blur, color), 不支持 spread
    // shadow:0px 0px 10px rgba(0,0,0,0.1);

  }, {
    key: '_doShadow',
    value: function _doShadow(view) {
      if (!view.css || !view.css.shadow) {
        return;
      }
      var box = view.css.shadow.replace(/,\s+/g, ',').split(' ');
      if (box.length > 4) {
        console.error('shadow don\'t spread option');
        return;
      }
      this.ctx.shadowOffsetX = parseInt(box[0], 10);
      this.ctx.shadowOffsetY = parseInt(box[1], 10);
      this.ctx.shadowBlur = parseInt(box[2], 10);
      this.ctx.shadowColor = box[3];
    }
  }, {
    key: '_getAngle',
    value: function _getAngle(angle) {
      return Number(angle) * Math.PI / 180;
    }
  }]);

  return Painter;
}();

exports.default = Painter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlbi5qcyJdLCJuYW1lcyI6WyJRUiIsInJlcXVpcmUiLCJHRCIsIlBhaW50ZXIiLCJjdHgiLCJkYXRhIiwiZ2xvYmFsV2lkdGgiLCJnbG9iYWxIZWlnaHQiLCJjYWxsYmFjayIsInN0eWxlIiwid2lkdGgiLCJ0b1B4IiwiaGVpZ2h0IiwiX2JhY2tncm91bmQiLCJ2aWV3cyIsInZpZXciLCJfZHJhd0Fic29sdXRlIiwiZHJhdyIsInNhdmUiLCJiZyIsImJhY2tncm91bmQiLCJ0cmFuc2xhdGUiLCJfZG9DbGlwIiwiYm9yZGVyUmFkaXVzIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzdGFydHNXaXRoIiwidG9Mb3dlckNhc2UiLCJhcGkiLCJpc0dyYWRpZW50IiwiZG9HcmFkaWVudCIsImRyYXdJbWFnZSIsInJlc3RvcmUiLCJjc3MiLCJsZW5ndGgiLCJPYmplY3QiLCJhc3NpZ24iLCJ0eXBlIiwiX2RyYXdBYnNJbWFnZSIsIl9maWxsQWJzVGV4dCIsIl9kcmF3QWJzUmVjdCIsIl9kcmF3UVJDb2RlIiwiciIsIk1hdGgiLCJtaW4iLCJnbG9iYWxBbHBoYSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwibGluZVRvIiwiY2xvc2VQYXRoIiwiZmlsbCIsImdldEFwcCIsInN5c3RlbUluZm8iLCJ2ZXJzaW9uIiwicGxhdGZvcm0iLCJjbGlwIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJDb2xvciIsIl9wcmVQcm9jZXNzIiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJzdHJva2UiLCJub3RDbGlwIiwiZXh0cmEiLCJ0ZXh0QXJyYXkiLCJ0ZXh0Iiwic3BsaXQiLCJpIiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiZm9udCIsImZvbnRGYW1pbHkiLCJsaW5lcyIsImxpbmVzQXJyYXkiLCJ0ZXh0TGVuZ3RoIiwibWVhc3VyZVRleHQiLCJwYXJ0V2lkdGgiLCJjYWxMaW5lcyIsImNlaWwiLCJtYXhMaW5lcyIsImxpbmVIZWlnaHQiLCJyYXRpbyIsInBpeGVsUmF0aW8iLCJyb3VuZCIsInNXaWR0aCIsInNIZWlnaHQiLCJjb25zb2xlIiwiZXJyb3IiLCJ4IiwicmlnaHQiLCJyaWdodHMiLCJsZWZ0IiwibGVmdHMiLCJ5IiwiYm90dG9tIiwidG9wIiwidG9wcyIsImFuZ2xlIiwicm90YXRlIiwiX2dldEFuZ2xlIiwiYWxpZ24iLCJfZG9TaGFkb3ciLCJpZCIsInJhd1dpZHRoIiwicmF3SGVpZ2h0IiwicGFkZGluZyIsInBkIiwicGRnIiwieiIsImEiLCJjb250ZW50IiwiY29sb3IiLCJfZG9Cb3JkZXIiLCJ1cmwiLCJyV2lkdGgiLCJySGVpZ2h0Iiwic3RhcnRYIiwic3RhcnRZIiwiY3AiLCJvcCIsIm1vZGUiLCJfZG9CYWNrZ3JvdW5kIiwidGV4dFdpZHRoIiwibGluZUluZGV4IiwiaiIsInByZUxpbmVMZW5ndGgiLCJzdGFydCIsImFscmVhZHlDb3VudCIsInN1YnN0ciIsIm1lYXN1cmVkV2l0aCIsInN1YnN0cmluZyIsInNldFRleHRBbGlnbiIsInRleHRBbGlnbiIsInRleHRTdHlsZSIsInN0cm9rZVRleHQiLCJmaWxsVGV4dCIsInRleHREZWNvcmF0aW9uIiwidGVzdCIsIm1vdmVUbyIsInNoYWRvdyIsImJveCIsInJlcGxhY2UiLCJzaGFkb3dPZmZzZXRYIiwicGFyc2VJbnQiLCJzaGFkb3dPZmZzZXRZIiwic2hhZG93Qmx1ciIsInNoYWRvd0NvbG9yIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLQyxRQUFRLGFBQVIsQ0FBWDtBQUNBLElBQU1DLEtBQUtELFFBQVEsZUFBUixDQUFYOztJQUVxQkUsTztBQUNuQixtQkFBWUMsR0FBWixFQUFpQkMsSUFBakIsRUFBdUI7QUFBQTs7QUFDckIsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDRDs7OzswQkFFS0MsUSxFQUFVO0FB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akM7QUFDRDs7Ozs7O2tCQWhpQmtCN0MsTyIsImZpbGUiOiJwZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBRUiA9IHJlcXVpcmUoJy4vcXJjb2RlLmpzJyk7XG5jb25zdCBHRCA9IHJlcXVpcmUoJy4vZ3JhZGllbnQuanMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFpbnRlciB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgZGF0YSkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5nbG9iYWxXaWR0aCA9IHt9O1xuICAgIHRoaXMuZ2xvYmFsSGVpZ2h0ID0ge307XG4gIH1cblxuICBwYWludChjYWxsYmFjaykge1xuICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICB3aWR0aDogdGhpcy5kYXRhLndpZHRoLnRvUHgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5kYXRhLmhlaWdodC50b1B4KCksXG4gICAgfTtcbiAgICB0aGlzLl9iYWNrZ3JvdW5kKCk7XG4gICAgZm9yIChjb25zdCB2aWV3IG9mIHRoaXMuZGF0YS52aWV3cykge1xuICAgICAgdGhpcy5fZHJhd0Fic29sdXRlKHZpZXcpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5kcmF3KGZhbHNlLCAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgX2JhY2tncm91bmQoKSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnN0eWxlO1xuICAgIGNvbnN0IGJnID0gdGhpcy5kYXRhLmJhY2tncm91bmQ7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG5cbiAgICB0aGlzLl9kb0NsaXAodGhpcy5kYXRhLmJvcmRlclJhZGl1cywgd2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKCFiZykge1xuICAgICAgLy8g5aaC5p6c5pyq6K6+572u6IOM5pmv77yM5YiZ6buY6K6k5L2/55So55m96ImyXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSBpZiAoYmcuc3RhcnRzV2l0aCgnIycpIHx8IGJnLnN0YXJ0c1dpdGgoJ3JnYmEnKSB8fCBiZy50b0xvd2VyQ2FzZSgpID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAvLyDog4zmma/loavlhYXpopzoibJcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLSh3aWR0aCAvIDIpLCAtKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKEdELmFwaS5pc0dyYWRpZW50KGJnKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQoYmcsIHdpZHRoLCBoZWlnaHQsIHRoaXMuY3R4KTtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOiDjOaZr+Whq+WFheWbvueJh1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGJnLCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBfZHJhd0Fic29sdXRlKHZpZXcpIHtcbiAgICAvLyDor4HmmI4gY3NzIOS4uuaVsOe7hOW9ouW8j++8jOmcgOimgeWQiOW5tlxuICAgIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5sZW5ndGgpIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICB2aWV3LmNzcyA9IE9iamVjdC5hc3NpZ24oLi4udmlldy5jc3MpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHZpZXcudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICB0aGlzLl9kcmF3QWJzSW1hZ2Uodmlldyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHRoaXMuX2ZpbGxBYnNUZXh0KHZpZXcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgICB0aGlzLl9kcmF3QWJzUmVjdCh2aWV3KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdxcmNvZGUnOlxuICAgICAgICB0aGlzLl9kcmF3UVJDb2RlKHZpZXcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDmoLnmja4gYm9yZGVyUmFkaXVzIOi/m+ihjOijgeWHj1xuICAgKi9cbiAgX2RvQ2xpcChib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBpZiAoYm9yZGVyUmFkaXVzICYmIHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgY29uc3QgciA9IE1hdGgubWluKGJvcmRlclJhZGl1cy50b1B4KCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAvLyDpmLLmraLlnKjmn5DkupvmnLrlnovkuIrlkajovrnmnInpu5HmoYbnjrDosaHvvIzmraTlpITlpoLmnpznm7TmjqXorr7nva4gZmlsbFN0eWxlIOS4uumAj+aYju+8jOWcqCBBbmRyb2lkIOacuuWei+S4iuS8muWvvOiHtOiiq+ijgeWHj+eahOWbvueJh+S5n+WPmOS4uumAj+aYju+8jCBpT1Mg5ZKMIElERSDkuIrkuI3kvJpcbiAgICAgIC8vIGdsb2JhbEFscGhhIOWcqCAxLjkuOTAg6LW35pSv5oyB77yM5L2O54mI5pys5LiL5peg5pWI77yM5L2G5oqKIGZpbGxTdHlsZSDorr7kuLrkuoYgd2hpdGXvvIznm7jlr7npu5jorqTnmoQgYmxhY2sg6KaB5aW954K5XG4gICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IDA7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIC1oZWlnaHQgLyAyICsgciwgciwgMSAqIE1hdGguUEksIDEuNSAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyKTtcbiAgICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEuNSAqIE1hdGguUEksIDIgKiBNYXRoLlBJKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIsIGhlaWdodCAvIDIgLSByKTtcbiAgICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCBoZWlnaHQgLyAyIC0gciwgciwgMCwgMC41ICogTWF0aC5QSSk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIpO1xuICAgICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyIC0gciwgciwgMC41ICogTWF0aC5QSSwgMSAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgICAvLyDlnKggaW9zIOeahCA2LjYuNiDniYjmnKzkuIogY2xpcCDmnIkgYnVn77yM56aB5o6J5q2k57G75Z6L5LiK55qEIGNsaXDvvIzkuZ/lsLHmhI/lkbPnnYDvvIzlnKjmraTniYjmnKzlvq7kv6HnmoQgaW9zIOiuvuWkh+S4i+aXoOazleS9v+eUqCBib3JkZXIg5bGe5oCnXG4gICAgICBpZiAoIShnZXRBcHAoKS5zeXN0ZW1JbmZvICYmXG4gICAgICAgICAgZ2V0QXBwKCkuc3lzdGVtSW5mby52ZXJzaW9uIDw9ICc2LjYuNicgJiZcbiAgICAgICAgICBnZXRBcHAoKS5zeXN0ZW1JbmZvLnBsYXRmb3JtID09PSAnaW9zJykpIHtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvovrnmoYZcbiAgICovXG4gIF9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKCF2aWV3LmNzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBib3JkZXJSYWRpdXMsXG4gICAgICBib3JkZXJXaWR0aCxcbiAgICAgIGJvcmRlckNvbG9yLFxuICAgIH0gPSB2aWV3LmNzcztcbiAgICBpZiAoIWJvcmRlcldpZHRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICB0aGlzLl9wcmVQcm9jZXNzKHZpZXcsIHRydWUpO1xuICAgIGxldCByO1xuICAgIGlmIChib3JkZXJSYWRpdXMpIHtcbiAgICAgIHIgPSBNYXRoLm1pbihib3JkZXJSYWRpdXMudG9QeCgpLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByID0gMDtcbiAgICB9XG4gICAgY29uc3QgbGluZVdpZHRoID0gYm9yZGVyV2lkdGgudG9QeCgpO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IChib3JkZXJDb2xvciB8fCAnYmxhY2snKTtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIC1oZWlnaHQgLyAyICsgciwgciArIGxpbmVXaWR0aCAvIDIsIDEgKiBNYXRoLlBJLCAxLjUgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyIC0gciwgLWhlaWdodCAvIDIgLSBsaW5lV2lkdGggLyAyKTtcbiAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgLWhlaWdodCAvIDIgKyByLCByICsgbGluZVdpZHRoIC8gMiwgMS41ICogTWF0aC5QSSwgMiAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIgKyBsaW5lV2lkdGggLyAyLCBoZWlnaHQgLyAyIC0gcik7XG4gICAgdGhpcy5jdHguYXJjKHdpZHRoIC8gMiAtIHIsIGhlaWdodCAvIDIgLSByLCByICsgbGluZVdpZHRoIC8gMiwgMCwgMC41ICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHgubGluZVRvKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyICsgbGluZVdpZHRoIC8gMik7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyIC0gciwgciArIGxpbmVXaWR0aCAvIDIsIDAuNSAqIE1hdGguUEksIDEgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBfcHJlUHJvY2Vzcyh2aWV3LCBub3RDbGlwKSB7XG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGxldCBleHRyYTtcbiAgICBzd2l0Y2ggKHZpZXcudHlwZSkge1xuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgY29uc3QgdGV4dEFycmF5ID0gdmlldy50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgLy8g5aSE55CG5aSa5Liq6L+e57ut55qEJ1xcbidcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAodGV4dEFycmF5W2ldID09PSAnJykge1xuICAgICAgICAgICAgdGV4dEFycmF5W2ldID0gJyAnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb250V2VpZ2h0ID0gdmlldy5jc3MuZm9udFdlaWdodCA9PT0gJ2JvbGQnID8gJ2JvbGQnIDogJ25vcm1hbCc7XG4gICAgICAgIHZpZXcuY3NzLmZvbnRTaXplID0gdmlldy5jc3MuZm9udFNpemUgPyB2aWV3LmNzcy5mb250U2l6ZSA6ICcyMHJweCc7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgbm9ybWFsICR7Zm9udFdlaWdodH0gJHt2aWV3LmNzcy5mb250U2l6ZS50b1B4KCl9cHggJHt2aWV3LmNzcy5mb250RmFtaWx5ID8gdmlldy5jc3MuZm9udEZhbWlseSA6ICdzYW5zLXNlcmlmJ31gO1xuICAgICAgICAvLyB0aGlzLmN0eC5zZXRGb250U2l6ZSh2aWV3LmNzcy5mb250U2l6ZS50b1B4KCkpO1xuICAgICAgICAvLyDorqHnrpfooYzmlbBcbiAgICAgICAgbGV0IGxpbmVzID0gMDtcbiAgICAgICAgY29uc3QgbGluZXNBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNvbnN0IHRleHRMZW5ndGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0QXJyYXlbaV0pLndpZHRoO1xuICAgICAgICAgIGNvbnN0IHBhcnRXaWR0aCA9IHZpZXcuY3NzLndpZHRoID8gdmlldy5jc3Mud2lkdGgudG9QeCgpIDogdGV4dExlbmd0aDtcbiAgICAgICAgICBjb25zdCBjYWxMaW5lcyA9IE1hdGguY2VpbCh0ZXh0TGVuZ3RoIC8gcGFydFdpZHRoKTtcbiAgICAgICAgICB3aWR0aCA9IHBhcnRXaWR0aCA+IHdpZHRoID8gcGFydFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgbGluZXMgKz0gY2FsTGluZXM7XG4gICAgICAgICAgbGluZXNBcnJheVtpXSA9IGNhbExpbmVzO1xuICAgICAgICB9XG4gICAgICAgIGxpbmVzID0gdmlldy5jc3MubWF4TGluZXMgPCBsaW5lcyA/IHZpZXcuY3NzLm1heExpbmVzIDogbGluZXM7XG4gICAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSB2aWV3LmNzcy5saW5lSGVpZ2h0ID8gdmlldy5jc3MubGluZUhlaWdodC50b1B4KCkgOiB2aWV3LmNzcy5mb250U2l6ZS50b1B4KCk7XG4gICAgICAgIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcztcbiAgICAgICAgZXh0cmEgPSB7XG4gICAgICAgICAgbGluZXM6IGxpbmVzLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHQsXG4gICAgICAgICAgdGV4dEFycmF5OiB0ZXh0QXJyYXksXG4gICAgICAgICAgbGluZXNBcnJheTogbGluZXNBcnJheSxcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdpbWFnZSc6IHtcbiAgICAgICAgLy8gaW1hZ2XnmoTplb/lrr3orr7nva7miJBhdXRv55qE6YC76L6R5aSE55CGXG4gICAgICAgIGNvbnN0IHJhdGlvID0gZ2V0QXBwKCkuc3lzdGVtSW5mby5waXhlbFJhdGlvID8gZ2V0QXBwKCkuc3lzdGVtSW5mby5waXhlbFJhdGlvIDogMjtcbiAgICAgICAgLy8g5pyJY3Nz5Y205pyq6K6+572ud2lkdGjmiJZoZWlnaHTvvIzliJnpu5jorqTkuLphdXRvXG4gICAgICAgIGlmICh2aWV3LmNzcykge1xuICAgICAgICAgIGlmICghdmlldy5jc3Mud2lkdGgpIHtcbiAgICAgICAgICAgIHZpZXcuY3NzLndpZHRoID0gJ2F1dG8nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXZpZXcuY3NzLmhlaWdodCkge1xuICAgICAgICAgICAgdmlldy5jc3MuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpZXcuY3NzIHx8ICh2aWV3LmNzcy53aWR0aCA9PT0gJ2F1dG8nICYmIHZpZXcuY3NzLmhlaWdodCA9PT0gJ2F1dG8nKSkge1xuICAgICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCh2aWV3LnNXaWR0aCAvIHJhdGlvKTtcbiAgICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKHZpZXcuc0hlaWdodCAvIHJhdGlvKTtcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3LmNzcy53aWR0aCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgaGVpZ2h0ID0gdmlldy5jc3MuaGVpZ2h0LnRvUHgoKTtcbiAgICAgICAgICB3aWR0aCA9IHZpZXcuc1dpZHRoIC8gdmlldy5zSGVpZ2h0ICogaGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXcuY3NzLmhlaWdodCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgd2lkdGggPSB2aWV3LmNzcy53aWR0aC50b1B4KCk7XG4gICAgICAgICAgaGVpZ2h0ID0gdmlldy5zSGVpZ2h0IC8gdmlldy5zV2lkdGggKiB3aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWR0aCA9IHZpZXcuY3NzLndpZHRoLnRvUHgoKTtcbiAgICAgICAgICBoZWlnaHQgPSB2aWV3LmNzcy5oZWlnaHQudG9QeCgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCEodmlldy5jc3Mud2lkdGggJiYgdmlldy5jc3MuaGVpZ2h0KSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBzaG91bGQgc2V0IHdpZHRoIGFuZCBoZWlnaHQnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2lkdGggPSB2aWV3LmNzcy53aWR0aC50b1B4KCk7XG4gICAgICAgIGhlaWdodCA9IHZpZXcuY3NzLmhlaWdodC50b1B4KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsZXQgeDtcbiAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MucmlnaHQpIHtcbiAgICAgIGlmICh0eXBlb2Ygdmlldy5jc3MucmlnaHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHggPSB0aGlzLnN0eWxlLndpZHRoIC0gdmlldy5jc3MucmlnaHQudG9QeCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWPr+S7peeUqOaVsOe7hOaWueW8j++8jOaKiuaWh+Wtl+mVv+W6puiuoeeul+i/m+WOu1xuICAgICAgICAvLyBbcmlnaHQsIOaWh+Wtl2lkLCDkuZjmlbDvvIjpu5jorqQgMe+8iV1cbiAgICAgICAgY29uc3QgcmlnaHRzID0gdmlldy5jc3MucmlnaHQ7XG4gICAgICAgIHggPSB0aGlzLnN0eWxlLndpZHRoIC0gcmlnaHRzWzBdLnRvUHgodHJ1ZSkgLSB0aGlzLmdsb2JhbFdpZHRoW3JpZ2h0c1sxXV0gKiAocmlnaHRzWzJdIHx8IDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MubGVmdCkge1xuICAgICAgaWYgKHR5cGVvZiB2aWV3LmNzcy5sZWZ0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB4ID0gdmlldy5jc3MubGVmdC50b1B4KHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGVmdHMgPSB2aWV3LmNzcy5sZWZ0O1xuICAgICAgICB4ID0gbGVmdHNbMF0udG9QeCh0cnVlKSArIHRoaXMuZ2xvYmFsV2lkdGhbbGVmdHNbMV1dICogKGxlZnRzWzJdIHx8IDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMDtcbiAgICB9XG4gICAgLy9jb25zdCB5ID0gdmlldy5jc3MgJiYgdmlldy5jc3MuYm90dG9tID8gdGhpcy5zdHlsZS5oZWlnaHQgLSBoZWlnaHQgLSB2aWV3LmNzcy5ib3R0b20udG9QeCh0cnVlKSA6ICh2aWV3LmNzcyAmJiB2aWV3LmNzcy50b3AgPyB2aWV3LmNzcy50b3AudG9QeCh0cnVlKSA6IDApO1xuICAgIGxldCB5O1xuICAgIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5ib3R0b20pIHtcbiAgICAgIHkgPSB0aGlzLnN0eWxlLmhlaWdodCAtIGhlaWdodCAtIHZpZXcuY3NzLmJvdHRvbS50b1B4KHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MudG9wKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygdmlldy5jc3MudG9wID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHkgPSB2aWV3LmNzcy50b3AudG9QeCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB0b3BzID0gdmlldy5jc3MudG9wO1xuICAgICAgICAgIHkgPSB0b3BzWzBdLnRvUHgodHJ1ZSkgKyB0aGlzLmdsb2JhbEhlaWdodFt0b3BzWzFdXSAqICh0b3BzWzJdIHx8IDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFuZ2xlID0gdmlldy5jc3MgJiYgdmlldy5jc3Mucm90YXRlID8gdGhpcy5fZ2V0QW5nbGUodmlldy5jc3Mucm90YXRlKSA6IDA7XG4gICAgLy8g5b2T6K6+572u5LqGIHJpZ2h0IOaXtu+8jOm7mOiupCBhbGlnbiDnlKggcmlnaHTvvIzlj43kuYvnlKggbGVmdFxuICAgIGNvbnN0IGFsaWduID0gdmlldy5jc3MgJiYgdmlldy5jc3MuYWxpZ24gPyB2aWV3LmNzcy5hbGlnbiA6ICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5yaWdodCA/ICdyaWdodCcgOiAnbGVmdCcpO1xuICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4LCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeCAtIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4ICsgd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yb3RhdGUoYW5nbGUpO1xuICAgIGlmICghbm90Q2xpcCAmJiB2aWV3LmNzcyAmJiB2aWV3LmNzcy5ib3JkZXJSYWRpdXMgJiYgdmlldy50eXBlICE9PSAncmVjdCcpIHtcbiAgICAgIHRoaXMuX2RvQ2xpcCh2aWV3LmNzcy5ib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLl9kb1NoYWRvdyh2aWV3KTtcbiAgICBpZiAodmlldy5pZCkge1xuICAgICAgdGhpcy5nbG9iYWxXaWR0aFt2aWV3LmlkXSA9IHdpZHRoO1xuICAgICAgdGhpcy5nbG9iYWxIZWlnaHRbdmlldy5pZF0gPSBoZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgZXh0cmE6IGV4dHJhLFxuICAgIH07XG4gIH1cblxuICAvLyDnlLvmloflrZfnmoTog4zmma/lm77niYdcbiAgX2RvQmFja2dyb3VuZCh2aWV3KSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoOiByYXdXaWR0aCxcbiAgICAgIGhlaWdodDogcmF3SGVpZ2h0LFxuICAgIH0gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcsIHRydWUpO1xuXG4gICAgY29uc3Qge1xuICAgICAgYmFja2dyb3VuZCxcbiAgICAgIHBhZGRpbmcsXG4gICAgfSA9IHZpZXcuY3NzO1xuICAgIGxldCBwZCA9IFswLCAwLCAwLCAwXTtcbiAgICBpZiAocGFkZGluZykge1xuICAgICAgY29uc3QgcGRnID0gcGFkZGluZy5zcGxpdCgvXFxzKy8pO1xuICAgICAgaWYgKHBkZy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgeCA9IHBkZ1swXS50b1B4KCk7XG4gICAgICAgIHBkID0gW3gsIHgsIHgsIHhdO1xuICAgICAgfVxuICAgICAgaWYgKHBkZy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3QgeCA9IHBkZ1swXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IHkgPSBwZGdbMV0udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB5LCB4LCB5XTtcbiAgICAgIH1cbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBjb25zdCB5ID0gcGRnWzFdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeiA9IHBkZ1syXS50b1B4KCk7XG4gICAgICAgIHBkID0gW3gsIHksIHosIHldO1xuICAgICAgfVxuICAgICAgaWYgKHBkZy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgY29uc3QgeCA9IHBkZ1swXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IHkgPSBwZGdbMV0udG9QeCgpO1xuICAgICAgICBjb25zdCB6ID0gcGRnWzJdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgYSA9IHBkZ1szXS50b1B4KCk7XG4gICAgICAgIHBkID0gW3gsIHksIHosIGFdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB3aWR0aCA9IHJhd1dpZHRoICsgcGRbMV0gKyBwZFszXTtcbiAgICBjb25zdCBoZWlnaHQgPSByYXdIZWlnaHQgKyBwZFswXSArIHBkWzJdO1xuICAgIHRoaXMuX2RvQ2xpcCh2aWV3LmNzcy5ib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQpXG4gICAgaWYgKEdELmFwaS5pc0dyYWRpZW50KGJhY2tncm91bmQpKSB7XG4gICAgICBHRC5hcGkuZG9HcmFkaWVudChiYWNrZ3JvdW5kLCB3aWR0aCwgaGVpZ2h0LCB0aGlzLmN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmQ7XG4gICAgfVxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBfZHJhd1FSQ29kZSh2aWV3KSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcpO1xuICAgIFFSLmFwaS5kcmF3KHZpZXcuY29udGVudCwgdGhpcy5jdHgsIC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0LCB2aWV3LmNzcy5iYWNrZ3JvdW5kLCB2aWV3LmNzcy5jb2xvcik7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIHRoaXMuX2RvQm9yZGVyKHZpZXcsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgX2RyYXdBYnNJbWFnZSh2aWV3KSB7XG4gICAgaWYgKCF2aWV3LnVybCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgY29uc3Qge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IHRoaXMuX3ByZVByb2Nlc3Modmlldyk7XG4gICAgLy8g6I635b6X57yp5pS+5Yiw5Zu+54mH5aSn5bCP57qn5Yir55qE6KOB5YeP5qGGXG4gICAgbGV0IHJXaWR0aCA9IHZpZXcuc1dpZHRoO1xuICAgIGxldCBySGVpZ2h0ID0gdmlldy5zSGVpZ2h0O1xuICAgIGxldCBzdGFydFggPSAwO1xuICAgIGxldCBzdGFydFkgPSAwO1xuICAgIC8vIOe7mOeUu+WMuuWfn+avlOS+i1xuICAgIGNvbnN0IGNwID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgLy8g5Y6f5Zu+5q+U5L6LXG4gICAgY29uc3Qgb3AgPSB2aWV3LnNXaWR0aCAvIHZpZXcuc0hlaWdodDtcbiAgICBpZiAoY3AgPj0gb3ApIHtcbiAgICAgIHJIZWlnaHQgPSByV2lkdGggLyBjcDtcbiAgICAgIHN0YXJ0WSA9IE1hdGgucm91bmQoKHZpZXcuc0hlaWdodCAtIHJIZWlnaHQpIC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJXaWR0aCA9IHJIZWlnaHQgKiBjcDtcbiAgICAgIHN0YXJ0WCA9IE1hdGgucm91bmQoKHZpZXcuc1dpZHRoIC0gcldpZHRoKSAvIDIpO1xuICAgIH1cbiAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MubW9kZSA9PT0gJ3NjYWxlVG9GaWxsJykge1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHZpZXcudXJsLCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2Uodmlldy51cmwsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIF9maWxsQWJzVGV4dCh2aWV3KSB7XG4gICAgaWYgKCF2aWV3LnRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHZpZXcuY3NzLmJhY2tncm91bmQpIHtcbiAgICAgIC8vIOeUn+aIkOiDjOaZr1xuICAgICAgdGhpcy5fZG9CYWNrZ3JvdW5kKHZpZXcpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgY29uc3Qge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBleHRyYSxcbiAgICB9ID0gdGhpcy5fcHJlUHJvY2Vzcyh2aWV3LCB2aWV3LmNzcy5iYWNrZ3JvdW5kICYmIHZpZXcuY3NzLmJvcmRlclJhZGl1cyk7XG5cbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAodmlldy5jc3MuY29sb3IgfHwgJ2JsYWNrJyk7XG4gICAgY29uc3Qge1xuICAgICAgbGluZXMsXG4gICAgICBsaW5lSGVpZ2h0LFxuICAgICAgdGV4dEFycmF5LFxuICAgICAgbGluZXNBcnJheSxcbiAgICB9ID0gZXh0cmE7XG4gICAgLy8g5aaC5p6c6K6+572u5LqGaWTvvIzliJnkv53nlZkgdGV4dCDnmoTplb/luqZcbiAgICBpZiAodmlldy5pZCkge1xuICAgICAgbGV0IHRleHRXaWR0aCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICB0ZXh0V2lkdGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0QXJyYXlbaV0pLndpZHRoID4gdGV4dFdpZHRoID8gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dEFycmF5W2ldKS53aWR0aCA6IHRleHRXaWR0aDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2xvYmFsV2lkdGhbdmlldy5pZF0gPSB3aWR0aCA/ICh0ZXh0V2lkdGggPCB3aWR0aCA/IHRleHRXaWR0aCA6IHdpZHRoKSA6IHRleHRXaWR0aDtcbiAgICB9XG4gICAgbGV0IGxpbmVJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHByZUxpbmVMZW5ndGggPSBNYXRoLnJvdW5kKHRleHRBcnJheVtqXS5sZW5ndGggLyBsaW5lc0FycmF5W2pdKTtcbiAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICBsZXQgYWxyZWFkeUNvdW50ID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXNBcnJheVtqXTsgKytpKSB7XG4gICAgICAgIC8vIOe7mOWItuihjOaVsOWkp+S6juacgOWkp+ihjOaVsO+8jOWImeebtOaOpei3s+WHuuW+queOr1xuICAgICAgICBpZiAobGluZUluZGV4ID49IGxpbmVzKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYWxyZWFkeUNvdW50ID0gcHJlTGluZUxlbmd0aDtcbiAgICAgICAgbGV0IHRleHQgPSB0ZXh0QXJyYXlbal0uc3Vic3RyKHN0YXJ0LCBhbHJlYWR5Q291bnQpO1xuICAgICAgICBsZXQgbWVhc3VyZWRXaXRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICAgIC8vIOWmguaenOa1i+mHj+Wkp+Wwj+Wwj+S6jndpZHRo5LiA5Liq5a2X56ym55qE5aSn5bCP77yM5YiZ6L+b6KGM6KGl6b2Q77yM5aaC5p6c5rWL6YeP5aSn5bCP6LaF5Ye6IHdpZHRo77yM5YiZ6L+b6KGM5YeP6ZmkXG4gICAgICAgIC8vIOWmguaenOW3sue7j+WIsOaWh+acrOacq+Wwvu+8jOS5n+S4jeimgei/m+ihjOivpeW+queOr1xuICAgICAgICB3aGlsZSAoKHN0YXJ0ICsgYWxyZWFkeUNvdW50IDw9IHRleHRBcnJheVtqXS5sZW5ndGgpICYmICh3aWR0aCAtIG1lYXN1cmVkV2l0aCA+IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKSB8fCBtZWFzdXJlZFdpdGggPiB3aWR0aCkpIHtcbiAgICAgICAgICBpZiAobWVhc3VyZWRXaXRoIDwgd2lkdGgpIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0QXJyYXlbal0uc3Vic3RyKHN0YXJ0LCArK2FscmVhZHlDb3VudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgIC8vIOWmguaenOWPquacieS4gOS4quWtl+espuaXtu+8jOebtOaOpei3s+WHuuW+queOr1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQgPSB0ZXh0QXJyYXlbal0uc3Vic3RyKHN0YXJ0LCAtLWFscmVhZHlDb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lYXN1cmVkV2l0aCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ICs9IHRleHQubGVuZ3RoO1xuICAgICAgICAvLyDlpoLmnpzmmK/mnIDlkI7kuIDooYzkuobvvIzlj5HnjrDov5jmnInmnKrnu5jliLblroznmoTlhoXlrrnvvIzliJnliqAuLi5cbiAgICAgICAgaWYgKGxpbmVJbmRleCA9PT0gbGluZXMgLSAxICYmIChqIDwgdGV4dEFycmF5Lmxlbmd0aCAtIDEgfHwgc3RhcnQgPCB0ZXh0QXJyYXlbal0ubGVuZ3RoKSkge1xuICAgICAgICAgIHdoaWxlICh0aGlzLmN0eC5tZWFzdXJlVGV4dChgJHt0ZXh0fS4uLmApLndpZHRoID4gd2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgIC8vIOWmguaenOWPquacieS4gOS4quWtl+espuaXtu+8jOebtOaOpei3s+WHuuW+queOr1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZXh0ICs9ICcuLi4nO1xuICAgICAgICAgIG1lYXN1cmVkV2l0aCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4LnNldFRleHRBbGlnbih2aWV3LmNzcy50ZXh0QWxpZ24gPyB2aWV3LmNzcy50ZXh0QWxpZ24gOiAnbGVmdCcpO1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgc3dpdGNoICh2aWV3LmNzcy50ZXh0QWxpZ24pIHtcbiAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICB4ID0gKHdpZHRoIC8gMik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgeCA9IC0od2lkdGggLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHkgPSAtKGhlaWdodCAvIDIpICsgKGxpbmVJbmRleCA9PT0gMCA/IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKSA6ICh2aWV3LmNzcy5mb250U2l6ZS50b1B4KCkgKyBsaW5lSW5kZXggKiBsaW5lSGVpZ2h0KSk7XG4gICAgICAgIGxpbmVJbmRleCsrO1xuICAgICAgICBpZiAodmlldy5jc3MudGV4dFN0eWxlID09PSAnc3Ryb2tlJykge1xuICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGV4dCwgeCwgeSwgbWVhc3VyZWRXaXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5LCBtZWFzdXJlZFdpdGgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdmlldy5jc3MuZm9udFNpemUudG9QeCgpO1xuICAgICAgICBpZiAodmlldy5jc3MudGV4dERlY29yYXRpb24pIHtcbiAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBpZiAoL1xcYnVuZGVybGluZVxcYi8udGVzdCh2aWV3LmNzcy50ZXh0RGVjb3JhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgbWVhc3VyZWRXaXRoLCB5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKC9cXGJvdmVybGluZVxcYi8udGVzdCh2aWV3LmNzcy50ZXh0RGVjb3JhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5IC0gZm9udFNpemUpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggKyBtZWFzdXJlZFdpdGgsIHkgLSBmb250U2l6ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFxibGluZS10aHJvdWdoXFxiLy50ZXN0KHZpZXcuY3NzLnRleHREZWNvcmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkgLSBmb250U2l6ZSAvIDMpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggKyBtZWFzdXJlZFdpdGgsIHkgLSBmb250U2l6ZSAvIDMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHZpZXcuY3NzLmNvbG9yO1xuICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIF9kcmF3QWJzUmVjdCh2aWV3KSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcpO1xuICAgIGlmIChHRC5hcGkuaXNHcmFkaWVudCh2aWV3LmNzcy5jb2xvcikpIHtcbiAgICAgIEdELmFwaS5kb0dyYWRpZW50KHZpZXcuY3NzLmNvbG9yLCB3aWR0aCwgaGVpZ2h0LCB0aGlzLmN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHZpZXcuY3NzLmNvbG9yO1xuICAgIH1cbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB2aWV3LmNzcy5ib3JkZXJSYWRpdXNcbiAgICBjb25zdCByID0gYm9yZGVyUmFkaXVzID8gTWF0aC5taW4oYm9yZGVyUmFkaXVzLnRvUHgoKSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKSA6IDA7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEgKiBNYXRoLlBJLCAxLjUgKiBNYXRoLlBJKTsgLy/lt6bkuIrop5LlnIblvKdcbiAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyIC0gciwgLWhlaWdodCAvIDIpO1xuICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEuNSAqIE1hdGguUEksIDIgKiBNYXRoLlBJKTsgLy8g5Y+z5LiK6KeS5ZyG5bynXG4gICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiAtIHIpO1xuICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCBoZWlnaHQgLyAyIC0gciwgciwgMCwgMC41ICogTWF0aC5QSSk7IC8vIOWPs+S4i+inkuWchuW8p1xuICAgIHRoaXMuY3R4LmxpbmVUbygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMik7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyIC0gciwgciwgMC41ICogTWF0aC5QSSwgMSAqIE1hdGguUEkpOyAvLyDlt6bkuIvop5LlnIblvKdcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIHRoaXMuX2RvQm9yZGVyKHZpZXcsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLy8gc2hhZG93IOaUr+aMgSAoeCwgeSwgYmx1ciwgY29sb3IpLCDkuI3mlK/mjIEgc3ByZWFkXG4gIC8vIHNoYWRvdzowcHggMHB4IDEwcHggcmdiYSgwLDAsMCwwLjEpO1xuICBfZG9TaGFkb3codmlldykge1xuICAgIGlmICghdmlldy5jc3MgfHwgIXZpZXcuY3NzLnNoYWRvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBib3ggPSB2aWV3LmNzcy5zaGFkb3cucmVwbGFjZSgvLFxccysvZywgJywnKS5zcGxpdCgnICcpO1xuICAgIGlmIChib3gubGVuZ3RoID4gNCkge1xuICAgICAgY29uc29sZS5lcnJvcignc2hhZG93IGRvblxcJ3Qgc3ByZWFkIG9wdGlvbicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN0eC5zaGFkb3dPZmZzZXRYID0gcGFyc2VJbnQoYm94WzBdLCAxMCk7XG4gICAgdGhpcy5jdHguc2hhZG93T2Zmc2V0WSA9IHBhcnNlSW50KGJveFsxXSwgMTApO1xuICAgIHRoaXMuY3R4LnNoYWRvd0JsdXIgPSBwYXJzZUludChib3hbMl0sIDEwKTtcbiAgICB0aGlzLmN0eC5zaGFkb3dDb2xvciA9IGJveFszXTtcbiAgfVxuXG4gIF9nZXRBbmdsZShhbmdsZSkge1xuICAgIHJldHVybiBOdW1iZXIoYW5nbGUpICogTWF0aC5QSSAvIDE4MDtcbiAgfVxufSJdfQ==