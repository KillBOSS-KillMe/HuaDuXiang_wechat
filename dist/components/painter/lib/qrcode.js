'use strict';

/* eslint-disable */
!function () {

  // alignment pattern
  var adelta = [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];

  // version block
  var vpat = [0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69];

  // final format bits with mask: level << 3 | mask
  var fmtword = [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976, //L
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0, //M
  0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed, //Q
  0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b //H
  ];

  // 4 per version: number of blocks 1,2; data width; ecc width
  var eccblocks = [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];

  // Galois field log table
  var glog = [0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b, 0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71, 0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45, 0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6, 0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88, 0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40, 0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d, 0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57, 0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18, 0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e, 0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61, 0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2, 0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6, 0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a, 0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7, 0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];

  // Galios field exponent table
  var gexp = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26, 0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23, 0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1, 0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0, 0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2, 0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce, 0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc, 0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54, 0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73, 0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff, 0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41, 0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6, 0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09, 0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16, 0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];

  // Working buffers:
  // data input and ecc append, image working buffer, fixed part of image, run lengths for badness
  var strinbuf = [],
      eccbuf = [],
      qrframe = [],
      framask = [],
      rlens = [];
  // Control values - width is based on version, last 4 are from table.
  var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
  var ecclevel = 2;
  // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal
  function setmask(x, y) {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    // y*y = 1+3+5...
    bt = y;
    bt *= y;
    bt += y;
    bt >>= 1;
    bt += x;
    framask[bt] = 1;
  }

  // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)
  function putalign(x, y) {
    var j;

    qrframe[x + width * y] = 1;
    for (j = -2; j < 2; j++) {
      qrframe[x + j + width * (y - 2)] = 1;
      qrframe[x - 2 + width * (y + j + 1)] = 1;
      qrframe[x + 2 + width * (y + j)] = 1;
      qrframe[x + j + 1 + width * (y + 2)] = 1;
    }
    for (j = 0; j < 2; j++) {
      setmask(x - 1, y + j);
      setmask(x + 1, y - j);
      setmask(x - j, y - 1);
      setmask(x + j, y + 1);
    }
  }

  //========================================================================
  // Reed Solomon error correction
  // exponentiation mod N
  function modnn(x) {
    while (x >= 255) {
      x -= 255;
      x = (x >> 8) + (x & 255);
    }
    return x;
  }

  var genpoly = [];

  // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.
  function appendrs(data, dlen, ecbuf, eclen) {
    var i, j, fb;

    for (i = 0; i < eclen; i++) {
      strinbuf[ecbuf + i] = 0;
    }for (i = 0; i < dlen; i++) {
      fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
      if (fb != 255) /* fb term is non-zero */
        for (j = 1; j < eclen; j++) {
          strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];
        } else for (j = ecbuf; j < ecbuf + eclen; j++) {
        strinbuf[j] = strinbuf[j + 1];
      }strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
    }
  }

  //========================================================================
  // Frame data insert following the path rules

  // check mask - since symmetrical use half.
  function ismasked(x, y) {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    bt = y;
    bt += y * y;
    bt >>= 1;
    bt += x;
    return framask[bt];
  }

  //========================================================================
  //  Apply the selected mask out of the 8.
  function applymask(m) {
    var x, y, r3x, r3y;

    switch (m) {
      case 0:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(x + y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 1:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) {
              r3x = 0;
              r3y = !r3y;
            }
            if (!r3y && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
    }
    return;
  }

  // Badness coefficients.
  var N1 = 3,
      N2 = 3,
      N3 = 40,
      N4 = 10;

  // Using the table of the length of each run, calculate the amount of bad image 
  // - long runs or those that look like finders; called twice, once each for X and Y
  function badruns(length) {
    var i;
    var runsbad = 0;
    for (i = 0; i <= length; i++) {
      if (rlens[i] >= 5) runsbad += N1 + rlens[i] - 5;
    } // BwBBBwB as in finder
    for (i = 3; i < length - 1; i += 2) {
      if (rlens[i - 2] == rlens[i + 2] && rlens[i + 2] == rlens[i - 1] && rlens[i - 1] == rlens[i + 1] && rlens[i - 1] * 3 == rlens[i]
      // white around the black pattern? Not part of spec
      && (rlens[i - 3] == 0 // beginning
      || i + 3 > length // end
      || rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4)) runsbad += N3;
    }return runsbad;
  }

  // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
  function badcheck() {
    var x, y, h, b, b1;
    var thisbad = 0;
    var bw = 0;

    // blocks of same color.
    for (y = 0; y < width - 1; y++) {
      for (x = 0; x < width - 1; x++) {
        if (qrframe[x + width * y] && qrframe[x + 1 + width * y] && qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
        !(qrframe[x + width * y] || qrframe[x + 1 + width * y] || qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)])) // all white
          thisbad += N2;
      }
    } // X runs
    for (y = 0; y < width; y++) {
      rlens[0] = 0;
      for (h = b = x = 0; x < width; x++) {
        if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else rlens[++h] = 1;
        b = b1;
        bw += b ? 1 : -1;
      }
      thisbad += badruns(h);
    }

    // black/white imbalance
    if (bw < 0) bw = -bw;

    var big = bw;
    var count = 0;
    big += big << 2;
    big <<= 1;
    while (big > width * width) {
      big -= width * width, count++;
    }thisbad += count * N4;

    // Y runs
    for (x = 0; x < width; x++) {
      rlens[0] = 0;
      for (h = b = y = 0; y < width; y++) {
        if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else rlens[++h] = 1;
        b = b1;
      }
      thisbad += badruns(h);
    }
    return thisbad;
  }

  function genframe(instring) {
    var x, y, k, t, v, i, j, m;

    // find the smallest version that fits the string
    t = instring.length;
    version = 0;
    do {
      version++;
      k = (ecclevel - 1) * 4 + (version - 1) * 16;
      neccblk1 = eccblocks[k++];
      neccblk2 = eccblocks[k++];
      datablkw = eccblocks[k++];
      eccblkwid = eccblocks[k];
      k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
      if (t <= k) break;
    } while (version < 40);

    // FIXME - insure that it fits insted of being truncated
    width = 17 + 4 * version;

    // allocate, clear and setup data structures
    v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (t = 0; t < v; t++) {
      eccbuf[t] = 0;
    }strinbuf = instring.slice(0);

    for (t = 0; t < width * width; t++) {
      qrframe[t] = 0;
    }for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
      framask[t] = 0;
    } // insert finders - black to frame, white to mask
    for (t = 0; t < 3; t++) {
      k = 0;
      y = 0;
      if (t == 1) k = width - 7;
      if (t == 2) y = width - 7;
      qrframe[y + 3 + width * (k + 3)] = 1;
      for (x = 0; x < 6; x++) {
        qrframe[y + x + width * k] = 1;
        qrframe[y + width * (k + x + 1)] = 1;
        qrframe[y + 6 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 6)] = 1;
      }
      for (x = 1; x < 5; x++) {
        setmask(y + x, k + 1);
        setmask(y + 1, k + x + 1);
        setmask(y + 5, k + x);
        setmask(y + x + 1, k + 5);
      }
      for (x = 2; x < 4; x++) {
        qrframe[y + x + width * (k + 2)] = 1;
        qrframe[y + 2 + width * (k + x + 1)] = 1;
        qrframe[y + 4 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 4)] = 1;
      }
    }

    // alignment blocks
    if (version > 1) {
      t = adelta[version];
      y = width - 7;
      for (;;) {
        x = width - 7;
        while (x > t - 3) {
          putalign(x, y);
          if (x < t) break;
          x -= t;
        }
        if (y <= t + 9) break;
        y -= t;
        putalign(6, y);
        putalign(y, 6);
      }
    }

    // single black
    qrframe[8 + width * (width - 8)] = 1;

    // timing gap - mask only
    for (y = 0; y < 7; y++) {
      setmask(7, y);
      setmask(width - 8, y);
      setmask(7, y + width - 7);
    }
    for (x = 0; x < 8; x++) {
      setmask(x, 7);
      setmask(x + width - 8, 7);
      setmask(x, width - 8);
    }

    // reserve mask-format area
    for (x = 0; x < 9; x++) {
      setmask(x, 8);
    }for (x = 0; x < 8; x++) {
      setmask(x + width - 8, 8);
      setmask(8, x);
    }
    for (y = 0; y < 7; y++) {
      setmask(8, y + width - 7);
    } // timing row/col
    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setmask(8 + x, 6);
        setmask(6, 8 + x);
      } else {
        qrframe[8 + x + width * 6] = 1;
        qrframe[6 + width * (8 + x)] = 1;
      }
    } // version block
    if (version > 6) {
      t = vpat[version - 7];
      k = 17;
      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
            qrframe[5 - x + width * (2 - y + width - 11)] = 1;
            qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
          } else {
            setmask(5 - x, 2 - y + width - 11);
            setmask(2 - y + width - 11, 5 - x);
          }
        }
      }
    }

    // sync mask bits - only set above for white spaces, so add in black bits
    for (y = 0; y < width; y++) {
      for (x = 0; x <= y; x++) {
        if (qrframe[x + width * y]) setmask(x, y);
      }
    } // convert string to bitstream
    // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
    v = strinbuf.length;

    // string to array
    for (i = 0; i < v; i++) {
      eccbuf[i] = strinbuf.charCodeAt(i);
    }strinbuf = eccbuf.slice(0);

    // calculate max string length
    x = datablkw * (neccblk1 + neccblk2) + neccblk2;
    if (v >= x - 2) {
      v = x - 2;
      if (version > 9) v--;
    }

    // shift and repack to insert length prefix
    i = v;
    if (version > 9) {
      strinbuf[i + 2] = 0;
      strinbuf[i + 3] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 3] |= 255 & t << 4;
        strinbuf[i + 2] = t >> 4;
      }
      strinbuf[2] |= 255 & v << 4;
      strinbuf[1] = v >> 4;
      strinbuf[0] = 0x40 | v >> 12;
    } else {
      strinbuf[i + 1] = 0;
      strinbuf[i + 2] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 2] |= 255 & t << 4;
        strinbuf[i + 1] = t >> 4;
      }
      strinbuf[1] |= 255 & v << 4;
      strinbuf[0] = 0x40 | v >> 4;
    }
    // fill to end with pad pattern
    i = v + 3 - (version < 10);
    while (i < x) {
      strinbuf[i++] = 0xec;
      // buffer has room    if (i == x)      break;
      strinbuf[i++] = 0x11;
    }

    // calculate and append ECC

    // calculate generator polynomial
    genpoly[0] = 1;
    for (i = 0; i < eccblkwid; i++) {
      genpoly[i + 1] = 1;
      for (j = i; j > 0; j--) {
        genpoly[j] = genpoly[j] ? genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];
      }genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
    }
    for (i = 0; i <= eccblkwid; i++) {
      genpoly[i] = glog[genpoly[i]];
    } // use logs for genpoly[] to save calc step

    // append ecc to data buffer
    k = x;
    y = 0;
    for (i = 0; i < neccblk1; i++) {
      appendrs(y, datablkw, k, eccblkwid);
      y += datablkw;
      k += eccblkwid;
    }
    for (i = 0; i < neccblk2; i++) {
      appendrs(y, datablkw + 1, k, eccblkwid);
      y += datablkw + 1;
      k += eccblkwid;
    }
    // interleave blocks
    y = 0;
    for (i = 0; i < datablkw; i++) {
      for (j = 0; j < neccblk1; j++) {
        eccbuf[y++] = strinbuf[i + j * datablkw];
      }for (j = 0; j < neccblk2; j++) {
        eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
      }
    }
    for (j = 0; j < neccblk2; j++) {
      eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
    }for (i = 0; i < eccblkwid; i++) {
      for (j = 0; j < neccblk1 + neccblk2; j++) {
        eccbuf[y++] = strinbuf[x + i + j * eccblkwid];
      }
    }strinbuf = eccbuf;

    // pack bits into frame avoiding masked area.
    x = y = width - 1;
    k = v = 1; // up, minus
    /* inteleaved data and ecc codes */
    m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (i = 0; i < m; i++) {
      t = strinbuf[i];
      for (j = 0; j < 8; j++, t <<= 1) {
        if (0x80 & t) qrframe[x + width * y] = 1;
        do {
          // find next fill position
          if (v) x--;else {
            x++;
            if (k) {
              if (y != 0) y--;else {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y = 9;
                }
              }
            } else {
              if (y != width - 1) y++;else {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y -= 8;
                }
              }
            }
          }
          v = !v;
        } while (ismasked(x, y));
      }
    }

    // save pre-mask copy of frame
    strinbuf = qrframe.slice(0);
    t = 0; // best
    y = 30000; // demerit
    // for instead of while since in original arduino code
    // if an early mask was "good enough" it wouldn't try for a better one
    // since they get more complex and take longer.
    for (k = 0; k < 8; k++) {
      applymask(k); // returns black-white imbalance
      x = badcheck();
      if (x < y) {
        // current mask better than previous best?
        y = x;
        t = k;
      }
      if (t == 7) break; // don't increment i to a void redoing mask
      qrframe = strinbuf.slice(0); // reset for next pass
    }
    if (t != k) // redo best mask - none good enough, last wasn't t
      applymask(t);

    // add in final mask/ecclevel bytes
    y = fmtword[t + (ecclevel - 1 << 3)];
    // low byte
    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        qrframe[width - 1 - k + width * 8] = 1;
        if (k < 6) qrframe[8 + width * k] = 1;else qrframe[8 + width * (k + 1)] = 1;
      }
    } // high byte
    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        qrframe[8 + width * (width - 7 + k)] = 1;
        if (k) qrframe[6 - k + width * 8] = 1;else qrframe[7 + width * 8] = 1;
      }
    }return qrframe;
  }

  var _canvas = null;

  var api = {

    get ecclevel() {
      return ecclevel;
    },

    set ecclevel(val) {
      ecclevel = val;
    },

    get size() {
      return _size;
    },

    set size(val) {
      _size = val;
    },

    get canvas() {
      return _canvas;
    },

    set canvas(el) {
      _canvas = el;
    },

    getFrame: function getFrame(string) {
      return genframe(string);
    },
    //这里的utf16to8(str)是对Text中的字符串进行转码，让其支持中文
    utf16to8: function utf16to8(str) {
      var out, i, len, c;

      out = "";
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007F) {
          out += str.charAt(i);
        } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
          out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
          out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        } else {
          out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
          out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        }
      }
      return out;
    },
    /**
     * 新增$this参数，传入组件的this,兼容在组件中生成
     * @param bg 目前只能设置颜色值
     */
    draw: function draw(str, ctx, startX, startY, cavW, cavH, bg, color, $this, ecc) {
      var that = this;
      ecclevel = ecc || ecclevel;
      if (!ctx) {
        console.warn('No canvas provided to draw QR code in!');
        return;
      }
      var size = Math.min(cavW, cavH);
      str = that.utf16to8(str); //增加中文显示

      var frame = that.getFrame(str);
      var px = size / width;
      if (bg) {
        ctx.setFillStyle(bg);
        ctx.fillRect(startX, startY, cavW, cavW);
      }
      ctx.setFillStyle(color || 'black');
      for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
          if (frame[j * width + i]) {
            ctx.fillRect(startX + px * i, startY + px * j, px, px);
          }
        }
      }
    }
  };
  module.exports = { api: api
    // exports.draw = api;

  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyY29kZS5qcyJdLCJuYW1lcyI6WyJhZGVsdGEiLCJ2cGF0IiwiZm10d29yZCIsImVjY2Jsb2NrcyIsImdsb2ciLCJnZXhwIiwic3RyaW5idWYiLCJlY2NidWYiLCJxcmZyYW1lIiwiZnJhbWFzayIsInJsZW5zIiwidmVyc2lvbiIsIndpZHRoIiwibmVjY2JsazEiLCJuZWNjYmxrMiIsImRhdGFibGt3IiwiZWNjYmxrd2lkIiwiZWNjbGV2ZWwiLCJzZXRtYXNrIiwieCIsInkiLCJidCIsInB1dGFsaWduIiwiaiIsIm1vZG5uIiwiZ2VucG9seSIsImFwcGVuZHJzIiwiZGF0YSIsImRsZW4iLCJlY2J1ZiIsImVjbGVuIiwiaSIsImZiIiwiaXNtYXNrZWQiLCJhcHBseW1hc2siLCJtIiwicjN4IiwicjN5IiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJiYWRydW5zIiwibGVuZ3RoIiwicnVuc2JhZCIsImJhZGNoZWNrIiwiaCIsImIiLCJiMSIsInRoaXNiYWQiLCJidyIsImJpZyIsImNvdW50IiwiZ2VuZnJhbWUiLCJpbnN0cmluZyIsImsiLCJ0IiwidiIsInNsaWNlIiwiY2hhckNvZGVBdCIsIl9jYW52YXMiLCJhcGkiLCJ2YWwiLCJzaXplIiwiX3NpemUiLCJjYW52YXMiLCJlbCIsImdldEZyYW1lIiwic3RyaW5nIiwidXRmMTZ0bzgiLCJzdHIiLCJvdXQiLCJsZW4iLCJjIiwiY2hhckF0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZHJhdyIsImN0eCIsInN0YXJ0WCIsInN0YXJ0WSIsImNhdlciLCJjYXZIIiwiYmciLCJjb2xvciIsIiR0aGlzIiwiZWNjIiwidGhhdCIsImNvbnNvbGUiLCJ3YXJuIiwiTWF0aCIsIm1pbiIsImZyYW1lIiwicHgiLCJzZXRGaWxsU3R5bGUiLCJmaWxsUmVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxDQUFFLFlBQVk7O0FBRVo7QUFDQSxNQUFJQSxTQUFTLENBQ1gsQ0FEVyxFQUNSLEVB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aUIsUUFBSixDQUFhaEIsU0FBU2MsS0FBSzlELENBQTNCLEVBQThCaUQsU0FBU2EsS0FBS3RFLENBQTVDLEVBQStDc0UsRUFBL0MsRUFBbURBLEVBQW5EO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUE5RU8sR0FBVjtBQWdGQUcsU0FBT0MsT0FBUCxHQUFpQixFQUFFcEM7QUFDbkI7O0FBRGlCLEdBQWpCO0FBR0QsQ0E5d0JBLEVBQUQiLCJmaWxlIjoicXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbiEoZnVuY3Rpb24gKCkge1xuXG4gIC8vIGFsaWdubWVudCBwYXR0ZXJuXG4gIHZhciBhZGVsdGEgPSBbXG4gICAgMCwgMTEsIDE1LCAxOSwgMjMsIDI3LCAzMSxcbiAgICAxNiwgMTgsIDIwLCAyMiwgMjQsIDI2LCAyOCwgMjAsIDIyLCAyNCwgMjQsIDI2LCAyOCwgMjgsIDIyLCAyNCwgMjQsXG4gICAgMjYsIDI2LCAyOCwgMjgsIDI0LCAyNCwgMjYsIDI2LCAyNiwgMjgsIDI4LCAyNCwgMjYsIDI2LCAyNiwgMjgsIDI4XG4gIF07XG5cbiAgLy8gdmVyc2lvbiBibG9ja1xuICB2YXIgdnBhdCA9IFtcbiAgICAweGM5NCwgMHg1YmMsIDB4YTk5LCAweDRkMywgMHhiZjYsIDB4NzYyLCAweDg0NywgMHg2MGQsXG4gICAgMHg5MjgsIDB4Yjc4LCAweDQ1ZCwgMHhhMTcsIDB4NTMyLCAweDlhNiwgMHg2ODMsIDB4OGM5LFxuICAgIDB4N2VjLCAweGVjNCwgMHgxZTEsIDB4ZmFiLCAweDA4ZSwgMHhjMWEsIDB4MzNmLCAweGQ3NSxcbiAgICAweDI1MCwgMHg5ZDUsIDB4NmYwLCAweDhiYSwgMHg3OWYsIDB4YjBiLCAweDQyZSwgMHhhNjQsXG4gICAgMHg1NDEsIDB4YzY5XG4gIF07XG5cbiAgLy8gZmluYWwgZm9ybWF0IGJpdHMgd2l0aCBtYXNrOiBsZXZlbCA8PCAzIHwgbWFza1xuICB2YXIgZm10d29yZCA9IFtcbiAgICAweDc3YzQsIDB4NzJmMywgMHg3ZGFhLCAweDc4OWQsIDB4NjYyZiwgMHg2MzE4LCAweDZjNDEsIDB4Njk3NiwgICAgLy9MXG4gICAgMHg1NDEyLCAweDUxMjUsIDB4NWU3YywgMHg1YjRiLCAweDQ1ZjksIDB4NDBjZSwgMHg0Zjk3LCAweDRhYTAsICAgIC8vTVxuICAgIDB4MzU1ZiwgMHgzMDY4LCAweDNmMzEsIDB4M2EwNiwgMHgyNGI0LCAweDIxODMsIDB4MmVkYSwgMHgyYmVkLCAgICAvL1FcbiAgICAweDE2ODksIDB4MTNiZSwgMHgxY2U3LCAweDE5ZDAsIDB4MDc2MiwgMHgwMjU1LCAweDBkMGMsIDB4MDgzYiAgICAvL0hcbiAgXTtcblxuICAvLyA0IHBlciB2ZXJzaW9uOiBudW1iZXIgb2YgYmxvY2tzIDEsMjsgZGF0YSB3aWR0aDsgZWNjIHdpZHRoXG4gIHZhciBlY2NibG9ja3MgPSBbXG4gICAgMSwgMCwgMTksIDcsIDEsIDAsIDE2LCAxMCwgMSwgMCwgMTMsIDEzLCAxLCAwLCA5LCAxNyxcbiAgICAxLCAwLCAzNCwgMTAsIDEsIDAsIDI4LCAxNiwgMSwgMCwgMjIsIDIyLCAxLCAwLCAxNiwgMjgsXG4gICAgMSwgMCwgNTUsIDE1LCAxLCAwLCA0NCwgMjYsIDIsIDAsIDE3LCAxOCwgMiwgMCwgMTMsIDIyLFxuICAgIDEsIDAsIDgwLCAyMCwgMiwgMCwgMzIsIDE4LCAyLCAwLCAyNCwgMjYsIDQsIDAsIDksIDE2LFxuICAgIDEsIDAsIDEwOCwgMjYsIDIsIDAsIDQzLCAyNCwgMiwgMiwgMTUsIDE4LCAyLCAyLCAxMSwgMjIsXG4gICAgMiwgMCwgNjgsIDE4LCA0LCAwLCAyNywgMTYsIDQsIDAsIDE5LCAyNCwgNCwgMCwgMTUsIDI4LFxuICAgIDIsIDAsIDc4LCAyMCwgNCwgMCwgMzEsIDE4LCAyLCA0LCAxNCwgMTgsIDQsIDEsIDEzLCAyNixcbiAgICAyLCAwLCA5NywgMjQsIDIsIDIsIDM4LCAyMiwgNCwgMiwgMTgsIDIyLCA0LCAyLCAxNCwgMjYsXG4gICAgMiwgMCwgMTE2LCAzMCwgMywgMiwgMzYsIDIyLCA0LCA0LCAxNiwgMjAsIDQsIDQsIDEyLCAyNCxcbiAgICAyLCAyLCA2OCwgMTgsIDQsIDEsIDQzLCAyNiwgNiwgMiwgMTksIDI0LCA2LCAyLCAxNSwgMjgsXG4gICAgNCwgMCwgODEsIDIwLCAxLCA0LCA1MCwgMzAsIDQsIDQsIDIyLCAyOCwgMywgOCwgMTIsIDI0LFxuICAgIDIsIDIsIDkyLCAyNCwgNiwgMiwgMzYsIDIyLCA0LCA2LCAyMCwgMjYsIDcsIDQsIDE0LCAyOCxcbiAgICA0LCAwLCAxMDcsIDI2LCA4LCAxLCAzNywgMjIsIDgsIDQsIDIwLCAyNCwgMTIsIDQsIDExLCAyMixcbiAgICAzLCAxLCAxMTUsIDMwLCA0LCA1LCA0MCwgMjQsIDExLCA1LCAxNiwgMjAsIDExLCA1LCAxMiwgMjQsXG4gICAgNSwgMSwgODcsIDIyLCA1LCA1LCA0MSwgMjQsIDUsIDcsIDI0LCAzMCwgMTEsIDcsIDEyLCAyNCxcbiAgICA1LCAxLCA5OCwgMjQsIDcsIDMsIDQ1LCAyOCwgMTUsIDIsIDE5LCAyNCwgMywgMTMsIDE1LCAzMCxcbiAgICAxLCA1LCAxMDcsIDI4LCAxMCwgMSwgNDYsIDI4LCAxLCAxNSwgMjIsIDI4LCAyLCAxNywgMTQsIDI4LFxuICAgIDUsIDEsIDEyMCwgMzAsIDksIDQsIDQzLCAyNiwgMTcsIDEsIDIyLCAyOCwgMiwgMTksIDE0LCAyOCxcbiAgICAzLCA0LCAxMTMsIDI4LCAzLCAxMSwgNDQsIDI2LCAxNywgNCwgMjEsIDI2LCA5LCAxNiwgMTMsIDI2LFxuICAgIDMsIDUsIDEwNywgMjgsIDMsIDEzLCA0MSwgMjYsIDE1LCA1LCAyNCwgMzAsIDE1LCAxMCwgMTUsIDI4LFxuICAgIDQsIDQsIDExNiwgMjgsIDE3LCAwLCA0MiwgMjYsIDE3LCA2LCAyMiwgMjgsIDE5LCA2LCAxNiwgMzAsXG4gICAgMiwgNywgMTExLCAyOCwgMTcsIDAsIDQ2LCAyOCwgNywgMTYsIDI0LCAzMCwgMzQsIDAsIDEzLCAyNCxcbiAgICA0LCA1LCAxMjEsIDMwLCA0LCAxNCwgNDcsIDI4LCAxMSwgMTQsIDI0LCAzMCwgMTYsIDE0LCAxNSwgMzAsXG4gICAgNiwgNCwgMTE3LCAzMCwgNiwgMTQsIDQ1LCAyOCwgMTEsIDE2LCAyNCwgMzAsIDMwLCAyLCAxNiwgMzAsXG4gICAgOCwgNCwgMTA2LCAyNiwgOCwgMTMsIDQ3LCAyOCwgNywgMjIsIDI0LCAzMCwgMjIsIDEzLCAxNSwgMzAsXG4gICAgMTAsIDIsIDExNCwgMjgsIDE5LCA0LCA0NiwgMjgsIDI4LCA2LCAyMiwgMjgsIDMzLCA0LCAxNiwgMzAsXG4gICAgOCwgNCwgMTIyLCAzMCwgMjIsIDMsIDQ1LCAyOCwgOCwgMjYsIDIzLCAzMCwgMTIsIDI4LCAxNSwgMzAsXG4gICAgMywgMTAsIDExNywgMzAsIDMsIDIzLCA0NSwgMjgsIDQsIDMxLCAyNCwgMzAsIDExLCAzMSwgMTUsIDMwLFxuICAgIDcsIDcsIDExNiwgMzAsIDIxLCA3LCA0NSwgMjgsIDEsIDM3LCAyMywgMzAsIDE5LCAyNiwgMTUsIDMwLFxuICAgIDUsIDEwLCAxMTUsIDMwLCAxOSwgMTAsIDQ3LCAyOCwgMTUsIDI1LCAyNCwgMzAsIDIzLCAyNSwgMTUsIDMwLFxuICAgIDEzLCAzLCAxMTUsIDMwLCAyLCAyOSwgNDYsIDI4LCA0MiwgMSwgMjQsIDMwLCAyMywgMjgsIDE1LCAzMCxcbiAgICAxNywgMCwgMTE1LCAzMCwgMTAsIDIzLCA0NiwgMjgsIDEwLCAzNSwgMjQsIDMwLCAxOSwgMzUsIDE1LCAzMCxcbiAgICAxNywgMSwgMTE1LCAzMCwgMTQsIDIxLCA0NiwgMjgsIDI5LCAxOSwgMjQsIDMwLCAxMSwgNDYsIDE1LCAzMCxcbiAgICAxMywgNiwgMTE1LCAzMCwgMTQsIDIzLCA0NiwgMjgsIDQ0LCA3LCAyNCwgMzAsIDU5LCAxLCAxNiwgMzAsXG4gICAgMTIsIDcsIDEyMSwgMzAsIDEyLCAyNiwgNDcsIDI4LCAzOSwgMTQsIDI0LCAzMCwgMjIsIDQxLCAxNSwgMzAsXG4gICAgNiwgMTQsIDEyMSwgMzAsIDYsIDM0LCA0NywgMjgsIDQ2LCAxMCwgMjQsIDMwLCAyLCA2NCwgMTUsIDMwLFxuICAgIDE3LCA0LCAxMjIsIDMwLCAyOSwgMTQsIDQ2LCAyOCwgNDksIDEwLCAyNCwgMzAsIDI0LCA0NiwgMTUsIDMwLFxuICAgIDQsIDE4LCAxMjIsIDMwLCAxMywgMzIsIDQ2LCAyOCwgNDgsIDE0LCAyNCwgMzAsIDQyLCAzMiwgMTUsIDMwLFxuICAgIDIwLCA0LCAxMTcsIDMwLCA0MCwgNywgNDcsIDI4LCA0MywgMjIsIDI0LCAzMCwgMTAsIDY3LCAxNSwgMzAsXG4gICAgMTksIDYsIDExOCwgMzAsIDE4LCAzMSwgNDcsIDI4LCAzNCwgMzQsIDI0LCAzMCwgMjAsIDYxLCAxNSwgMzBcbiAgXTtcblxuICAvLyBHYWxvaXMgZmllbGQgbG9nIHRhYmxlXG4gIHZhciBnbG9nID0gW1xuICAgIDB4ZmYsIDB4MDAsIDB4MDEsIDB4MTksIDB4MDIsIDB4MzIsIDB4MWEsIDB4YzYsIDB4MDMsIDB4ZGYsIDB4MzMsIDB4ZWUsIDB4MWIsIDB4NjgsIDB4YzcsIDB4NGIsXG4gICAgMHgwNCwgMHg2NCwgMHhlMCwgMHgwZSwgMHgzNCwgMHg4ZCwgMHhlZiwgMHg4MSwgMHgxYywgMHhjMSwgMHg2OSwgMHhmOCwgMHhjOCwgMHgwOCwgMHg0YywgMHg3MSxcbiAgICAweDA1LCAweDhhLCAweDY1LCAweDJmLCAweGUxLCAweDI0LCAweDBmLCAweDIxLCAweDM1LCAweDkzLCAweDhlLCAweGRhLCAweGYwLCAweDEyLCAweDgyLCAweDQ1LFxuICAgIDB4MWQsIDB4YjUsIDB4YzIsIDB4N2QsIDB4NmEsIDB4MjcsIDB4ZjksIDB4YjksIDB4YzksIDB4OWEsIDB4MDksIDB4NzgsIDB4NGQsIDB4ZTQsIDB4NzIsIDB4YTYsXG4gICAgMHgwNiwgMHhiZiwgMHg4YiwgMHg2MiwgMHg2NiwgMHhkZCwgMHgzMCwgMHhmZCwgMHhlMiwgMHg5OCwgMHgyNSwgMHhiMywgMHgxMCwgMHg5MSwgMHgyMiwgMHg4OCxcbiAgICAweDM2LCAweGQwLCAweDk0LCAweGNlLCAweDhmLCAweDk2LCAweGRiLCAweGJkLCAweGYxLCAweGQyLCAweDEzLCAweDVjLCAweDgzLCAweDM4LCAweDQ2LCAweDQwLFxuICAgIDB4MWUsIDB4NDIsIDB4YjYsIDB4YTMsIDB4YzMsIDB4NDgsIDB4N2UsIDB4NmUsIDB4NmIsIDB4M2EsIDB4MjgsIDB4NTQsIDB4ZmEsIDB4ODUsIDB4YmEsIDB4M2QsXG4gICAgMHhjYSwgMHg1ZSwgMHg5YiwgMHg5ZiwgMHgwYSwgMHgxNSwgMHg3OSwgMHgyYiwgMHg0ZSwgMHhkNCwgMHhlNSwgMHhhYywgMHg3MywgMHhmMywgMHhhNywgMHg1NyxcbiAgICAweDA3LCAweDcwLCAweGMwLCAweGY3LCAweDhjLCAweDgwLCAweDYzLCAweDBkLCAweDY3LCAweDRhLCAweGRlLCAweGVkLCAweDMxLCAweGM1LCAweGZlLCAweDE4LFxuICAgIDB4ZTMsIDB4YTUsIDB4OTksIDB4NzcsIDB4MjYsIDB4YjgsIDB4YjQsIDB4N2MsIDB4MTEsIDB4NDQsIDB4OTIsIDB4ZDksIDB4MjMsIDB4MjAsIDB4ODksIDB4MmUsXG4gICAgMHgzNywgMHgzZiwgMHhkMSwgMHg1YiwgMHg5NSwgMHhiYywgMHhjZiwgMHhjZCwgMHg5MCwgMHg4NywgMHg5NywgMHhiMiwgMHhkYywgMHhmYywgMHhiZSwgMHg2MSxcbiAgICAweGYyLCAweDU2LCAweGQzLCAweGFiLCAweDE0LCAweDJhLCAweDVkLCAweDllLCAweDg0LCAweDNjLCAweDM5LCAweDUzLCAweDQ3LCAweDZkLCAweDQxLCAweGEyLFxuICAgIDB4MWYsIDB4MmQsIDB4NDMsIDB4ZDgsIDB4YjcsIDB4N2IsIDB4YTQsIDB4NzYsIDB4YzQsIDB4MTcsIDB4NDksIDB4ZWMsIDB4N2YsIDB4MGMsIDB4NmYsIDB4ZjYsXG4gICAgMHg2YywgMHhhMSwgMHgzYiwgMHg1MiwgMHgyOSwgMHg5ZCwgMHg1NSwgMHhhYSwgMHhmYiwgMHg2MCwgMHg4NiwgMHhiMSwgMHhiYiwgMHhjYywgMHgzZSwgMHg1YSxcbiAgICAweGNiLCAweDU5LCAweDVmLCAweGIwLCAweDljLCAweGE5LCAweGEwLCAweDUxLCAweDBiLCAweGY1LCAweDE2LCAweGViLCAweDdhLCAweDc1LCAweDJjLCAweGQ3LFxuICAgIDB4NGYsIDB4YWUsIDB4ZDUsIDB4ZTksIDB4ZTYsIDB4ZTcsIDB4YWQsIDB4ZTgsIDB4NzQsIDB4ZDYsIDB4ZjQsIDB4ZWEsIDB4YTgsIDB4NTAsIDB4NTgsIDB4YWZcbiAgXTtcblxuICAvLyBHYWxpb3MgZmllbGQgZXhwb25lbnQgdGFibGVcbiAgdmFyIGdleHAgPSBbXG4gICAgMHgwMSwgMHgwMiwgMHgwNCwgMHgwOCwgMHgxMCwgMHgyMCwgMHg0MCwgMHg4MCwgMHgxZCwgMHgzYSwgMHg3NCwgMHhlOCwgMHhjZCwgMHg4NywgMHgxMywgMHgyNixcbiAgICAweDRjLCAweDk4LCAweDJkLCAweDVhLCAweGI0LCAweDc1LCAweGVhLCAweGM5LCAweDhmLCAweDAzLCAweDA2LCAweDBjLCAweDE4LCAweDMwLCAweDYwLCAweGMwLFxuICAgIDB4OWQsIDB4MjcsIDB4NGUsIDB4OWMsIDB4MjUsIDB4NGEsIDB4OTQsIDB4MzUsIDB4NmEsIDB4ZDQsIDB4YjUsIDB4NzcsIDB4ZWUsIDB4YzEsIDB4OWYsIDB4MjMsXG4gICAgMHg0NiwgMHg4YywgMHgwNSwgMHgwYSwgMHgxNCwgMHgyOCwgMHg1MCwgMHhhMCwgMHg1ZCwgMHhiYSwgMHg2OSwgMHhkMiwgMHhiOSwgMHg2ZiwgMHhkZSwgMHhhMSxcbiAgICAweDVmLCAweGJlLCAweDYxLCAweGMyLCAweDk5LCAweDJmLCAweDVlLCAweGJjLCAweDY1LCAweGNhLCAweDg5LCAweDBmLCAweDFlLCAweDNjLCAweDc4LCAweGYwLFxuICAgIDB4ZmQsIDB4ZTcsIDB4ZDMsIDB4YmIsIDB4NmIsIDB4ZDYsIDB4YjEsIDB4N2YsIDB4ZmUsIDB4ZTEsIDB4ZGYsIDB4YTMsIDB4NWIsIDB4YjYsIDB4NzEsIDB4ZTIsXG4gICAgMHhkOSwgMHhhZiwgMHg0MywgMHg4NiwgMHgxMSwgMHgyMiwgMHg0NCwgMHg4OCwgMHgwZCwgMHgxYSwgMHgzNCwgMHg2OCwgMHhkMCwgMHhiZCwgMHg2NywgMHhjZSxcbiAgICAweDgxLCAweDFmLCAweDNlLCAweDdjLCAweGY4LCAweGVkLCAweGM3LCAweDkzLCAweDNiLCAweDc2LCAweGVjLCAweGM1LCAweDk3LCAweDMzLCAweDY2LCAweGNjLFxuICAgIDB4ODUsIDB4MTcsIDB4MmUsIDB4NWMsIDB4YjgsIDB4NmQsIDB4ZGEsIDB4YTksIDB4NGYsIDB4OWUsIDB4MjEsIDB4NDIsIDB4ODQsIDB4MTUsIDB4MmEsIDB4NTQsXG4gICAgMHhhOCwgMHg0ZCwgMHg5YSwgMHgyOSwgMHg1MiwgMHhhNCwgMHg1NSwgMHhhYSwgMHg0OSwgMHg5MiwgMHgzOSwgMHg3MiwgMHhlNCwgMHhkNSwgMHhiNywgMHg3MyxcbiAgICAweGU2LCAweGQxLCAweGJmLCAweDYzLCAweGM2LCAweDkxLCAweDNmLCAweDdlLCAweGZjLCAweGU1LCAweGQ3LCAweGIzLCAweDdiLCAweGY2LCAweGYxLCAweGZmLFxuICAgIDB4ZTMsIDB4ZGIsIDB4YWIsIDB4NGIsIDB4OTYsIDB4MzEsIDB4NjIsIDB4YzQsIDB4OTUsIDB4MzcsIDB4NmUsIDB4ZGMsIDB4YTUsIDB4NTcsIDB4YWUsIDB4NDEsXG4gICAgMHg4MiwgMHgxOSwgMHgzMiwgMHg2NCwgMHhjOCwgMHg4ZCwgMHgwNywgMHgwZSwgMHgxYywgMHgzOCwgMHg3MCwgMHhlMCwgMHhkZCwgMHhhNywgMHg1MywgMHhhNixcbiAgICAweDUxLCAweGEyLCAweDU5LCAweGIyLCAweDc5LCAweGYyLCAweGY5LCAweGVmLCAweGMzLCAweDliLCAweDJiLCAweDU2LCAweGFjLCAweDQ1LCAweDhhLCAweDA5LFxuICAgIDB4MTIsIDB4MjQsIDB4NDgsIDB4OTAsIDB4M2QsIDB4N2EsIDB4ZjQsIDB4ZjUsIDB4ZjcsIDB4ZjMsIDB4ZmIsIDB4ZWIsIDB4Y2IsIDB4OGIsIDB4MGIsIDB4MTYsXG4gICAgMHgyYywgMHg1OCwgMHhiMCwgMHg3ZCwgMHhmYSwgMHhlOSwgMHhjZiwgMHg4MywgMHgxYiwgMHgzNiwgMHg2YywgMHhkOCwgMHhhZCwgMHg0NywgMHg4ZSwgMHgwMFxuICBdO1xuXG4gIC8vIFdvcmtpbmcgYnVmZmVyczpcbiAgLy8gZGF0YSBpbnB1dCBhbmQgZWNjIGFwcGVuZCwgaW1hZ2Ugd29ya2luZyBidWZmZXIsIGZpeGVkIHBhcnQgb2YgaW1hZ2UsIHJ1biBsZW5ndGhzIGZvciBiYWRuZXNzXG4gIHZhciBzdHJpbmJ1ZiA9IFtdLCBlY2NidWYgPSBbXSwgcXJmcmFtZSA9IFtdLCBmcmFtYXNrID0gW10sIHJsZW5zID0gW107XG4gIC8vIENvbnRyb2wgdmFsdWVzIC0gd2lkdGggaXMgYmFzZWQgb24gdmVyc2lvbiwgbGFzdCA0IGFyZSBmcm9tIHRhYmxlLlxuICB2YXIgdmVyc2lvbiwgd2lkdGgsIG5lY2NibGsxLCBuZWNjYmxrMiwgZGF0YWJsa3csIGVjY2Jsa3dpZDtcbiAgdmFyIGVjY2xldmVsID0gMjtcbiAgLy8gc2V0IGJpdCB0byBpbmRpY2F0ZSBjZWxsIGluIHFyZnJhbWUgaXMgaW1tdXRhYmxlLiAgc3ltbWV0cmljIGFyb3VuZCBkaWFnb25hbFxuICBmdW5jdGlvbiBzZXRtYXNrKHgsIHkpIHtcbiAgICB2YXIgYnQ7XG4gICAgaWYgKHggPiB5KSB7XG4gICAgICBidCA9IHg7XG4gICAgICB4ID0geTtcbiAgICAgIHkgPSBidDtcbiAgICB9XG4gICAgLy8geSp5ID0gMSszKzUuLi5cbiAgICBidCA9IHk7XG4gICAgYnQgKj0geTtcbiAgICBidCArPSB5O1xuICAgIGJ0ID4+PSAxO1xuICAgIGJ0ICs9IHg7XG4gICAgZnJhbWFza1tidF0gPSAxO1xuICB9XG5cbiAgLy8gZW50ZXIgYWxpZ25tZW50IHBhdHRlcm4gLSBibGFjayB0byBxcmZyYW1lLCB3aGl0ZSB0byBtYXNrIChsYXRlciBibGFjayBmcmFtZSBtZXJnZWQgdG8gbWFzaylcbiAgZnVuY3Rpb24gcHV0YWxpZ24oeCwgeSkge1xuICAgIHZhciBqO1xuXG4gICAgcXJmcmFtZVt4ICsgd2lkdGggKiB5XSA9IDE7XG4gICAgZm9yIChqID0gLTI7IGogPCAyOyBqKyspIHtcbiAgICAgIHFyZnJhbWVbKHggKyBqKSArIHdpZHRoICogKHkgLSAyKV0gPSAxO1xuICAgICAgcXJmcmFtZVsoeCAtIDIpICsgd2lkdGggKiAoeSArIGogKyAxKV0gPSAxO1xuICAgICAgcXJmcmFtZVsoeCArIDIpICsgd2lkdGggKiAoeSArIGopXSA9IDE7XG4gICAgICBxcmZyYW1lWyh4ICsgaiArIDEpICsgd2lkdGggKiAoeSArIDIpXSA9IDE7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgIHNldG1hc2soeCAtIDEsIHkgKyBqKTtcbiAgICAgIHNldG1hc2soeCArIDEsIHkgLSBqKTtcbiAgICAgIHNldG1hc2soeCAtIGosIHkgLSAxKTtcbiAgICAgIHNldG1hc2soeCArIGosIHkgKyAxKTtcbiAgICB9XG4gIH1cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBSZWVkIFNvbG9tb24gZXJyb3IgY29ycmVjdGlvblxuICAvLyBleHBvbmVudGlhdGlvbiBtb2QgTlxuICBmdW5jdGlvbiBtb2Rubih4KSB7XG4gICAgd2hpbGUgKHggPj0gMjU1KSB7XG4gICAgICB4IC09IDI1NTtcbiAgICAgIHggPSAoeCA+PiA4KSArICh4ICYgMjU1KTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICB2YXIgZ2VucG9seSA9IFtdO1xuXG4gIC8vIENhbGN1bGF0ZSBhbmQgYXBwZW5kIEVDQyBkYXRhIHRvIGRhdGEgYmxvY2suICBCbG9jayBpcyBpbiBzdHJpbmJ1ZiwgaW5kZXhlcyB0byBidWZmZXJzIGdpdmVuLlxuICBmdW5jdGlvbiBhcHBlbmRycyhkYXRhLCBkbGVuLCBlY2J1ZiwgZWNsZW4pIHtcbiAgICB2YXIgaSwgaiwgZmI7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZWNsZW47IGkrKylcbiAgICAgIHN0cmluYnVmW2VjYnVmICsgaV0gPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBkbGVuOyBpKyspIHtcbiAgICAgIGZiID0gZ2xvZ1tzdHJpbmJ1ZltkYXRhICsgaV0gXiBzdHJpbmJ1ZltlY2J1Zl1dO1xuICAgICAgaWYgKGZiICE9IDI1NSkgICAgIC8qIGZiIHRlcm0gaXMgbm9uLXplcm8gKi9cbiAgICAgICAgZm9yIChqID0gMTsgaiA8IGVjbGVuOyBqKyspXG4gICAgICAgICAgc3RyaW5idWZbZWNidWYgKyBqIC0gMV0gPSBzdHJpbmJ1ZltlY2J1ZiArIGpdIF4gZ2V4cFttb2RubihmYiArIGdlbnBvbHlbZWNsZW4gLSBqXSldO1xuICAgICAgZWxzZVxuICAgICAgICBmb3IgKGogPSBlY2J1ZjsgaiA8IGVjYnVmICsgZWNsZW47IGorKylcbiAgICAgICAgICBzdHJpbmJ1ZltqXSA9IHN0cmluYnVmW2ogKyAxXTtcbiAgICAgIHN0cmluYnVmW2VjYnVmICsgZWNsZW4gLSAxXSA9IGZiID09IDI1NSA/IDAgOiBnZXhwW21vZG5uKGZiICsgZ2VucG9seVswXSldO1xuICAgIH1cbiAgfVxuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEZyYW1lIGRhdGEgaW5zZXJ0IGZvbGxvd2luZyB0aGUgcGF0aCBydWxlc1xuXG4gIC8vIGNoZWNrIG1hc2sgLSBzaW5jZSBzeW1tZXRyaWNhbCB1c2UgaGFsZi5cbiAgZnVuY3Rpb24gaXNtYXNrZWQoeCwgeSkge1xuICAgIHZhciBidDtcbiAgICBpZiAoeCA+IHkpIHtcbiAgICAgIGJ0ID0geDtcbiAgICAgIHggPSB5O1xuICAgICAgeSA9IGJ0O1xuICAgIH1cbiAgICBidCA9IHk7XG4gICAgYnQgKz0geSAqIHk7XG4gICAgYnQgPj49IDE7XG4gICAgYnQgKz0geDtcbiAgICByZXR1cm4gZnJhbWFza1tidF07XG4gIH1cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyAgQXBwbHkgdGhlIHNlbGVjdGVkIG1hc2sgb3V0IG9mIHRoZSA4LlxuICBmdW5jdGlvbiBhcHBseW1hc2sobSkge1xuICAgIHZhciB4LCB5LCByM3gsIHIzeTtcblxuICAgIHN3aXRjaCAobSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcbiAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKylcbiAgICAgICAgICAgIGlmICghKCh4ICsgeSkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxuICAgICAgICAgICAgaWYgKCEoeSAmIDEpICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgaWYgKCFyM3ggJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xuICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgZm9yIChyM3ggPSByM3ksIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XG4gICAgICAgICAgICBpZiAocjN4ID09IDMpXG4gICAgICAgICAgICAgIHIzeCA9IDA7XG4gICAgICAgICAgICBpZiAoIXIzeCAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgIGZvciAocjN4ID0gMCwgcjN5ID0gKCh5ID4+IDEpICYgMSksIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XG4gICAgICAgICAgICBpZiAocjN4ID09IDMpIHtcbiAgICAgICAgICAgICAgcjN4ID0gMDtcbiAgICAgICAgICAgICAgcjN5ID0gIXIzeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcjN5ICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrICwgcjN5KyspIHtcbiAgICAgICAgICBpZiAocjN5ID09IDMpXG4gICAgICAgICAgICByM3kgPSAwO1xuICAgICAgICAgIGZvciAocjN4ID0gMCwgeCA9IDA7IHggPCB3aWR0aDsgeCsrICwgcjN4KyspIHtcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcbiAgICAgICAgICAgICAgcjN4ID0gMDtcbiAgICAgICAgICAgIGlmICghKCh4ICYgeSAmIDEpICsgISghcjN4IHwgIXIzeSkpICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xuICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgaWYgKCEoKCh4ICYgeSAmIDEpICsgKHIzeCAmJiAocjN4ID09IHIzeSkpKSAmIDEpICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xuICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgaWYgKCEoKChyM3ggJiYgKHIzeCA9PSByM3kpKSArICgoeCArIHkpICYgMSkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBCYWRuZXNzIGNvZWZmaWNpZW50cy5cbiAgdmFyIE4xID0gMywgTjIgPSAzLCBOMyA9IDQwLCBONCA9IDEwO1xuXG4gIC8vIFVzaW5nIHRoZSB0YWJsZSBvZiB0aGUgbGVuZ3RoIG9mIGVhY2ggcnVuLCBjYWxjdWxhdGUgdGhlIGFtb3VudCBvZiBiYWQgaW1hZ2UgXG4gIC8vIC0gbG9uZyBydW5zIG9yIHRob3NlIHRoYXQgbG9vayBsaWtlIGZpbmRlcnM7IGNhbGxlZCB0d2ljZSwgb25jZSBlYWNoIGZvciBYIGFuZCBZXG4gIGZ1bmN0aW9uIGJhZHJ1bnMobGVuZ3RoKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHJ1bnNiYWQgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPD0gbGVuZ3RoOyBpKyspXG4gICAgICBpZiAocmxlbnNbaV0gPj0gNSlcbiAgICAgICAgcnVuc2JhZCArPSBOMSArIHJsZW5zW2ldIC0gNTtcbiAgICAvLyBCd0JCQndCIGFzIGluIGZpbmRlclxuICAgIGZvciAoaSA9IDM7IGkgPCBsZW5ndGggLSAxOyBpICs9IDIpXG4gICAgICBpZiAocmxlbnNbaSAtIDJdID09IHJsZW5zW2kgKyAyXVxuICAgICAgICAmJiBybGVuc1tpICsgMl0gPT0gcmxlbnNbaSAtIDFdXG4gICAgICAgICYmIHJsZW5zW2kgLSAxXSA9PSBybGVuc1tpICsgMV1cbiAgICAgICAgJiYgcmxlbnNbaSAtIDFdICogMyA9PSBybGVuc1tpXVxuICAgICAgICAvLyB3aGl0ZSBhcm91bmQgdGhlIGJsYWNrIHBhdHRlcm4/IE5vdCBwYXJ0IG9mIHNwZWNcbiAgICAgICAgJiYgKHJsZW5zW2kgLSAzXSA9PSAwIC8vIGJlZ2lubmluZ1xuICAgICAgICAgIHx8IGkgKyAzID4gbGVuZ3RoICAvLyBlbmRcbiAgICAgICAgICB8fCBybGVuc1tpIC0gM10gKiAzID49IHJsZW5zW2ldICogNCB8fCBybGVuc1tpICsgM10gKiAzID49IHJsZW5zW2ldICogNClcbiAgICAgIClcbiAgICAgICAgcnVuc2JhZCArPSBOMztcbiAgICByZXR1cm4gcnVuc2JhZDtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBob3cgYmFkIHRoZSBtYXNrZWQgaW1hZ2UgaXMgLSBibG9ja3MsIGltYmFsYW5jZSwgcnVucywgb3IgZmluZGVycy5cbiAgZnVuY3Rpb24gYmFkY2hlY2soKSB7XG4gICAgdmFyIHgsIHksIGgsIGIsIGIxO1xuICAgIHZhciB0aGlzYmFkID0gMDtcbiAgICB2YXIgYncgPSAwO1xuXG4gICAgLy8gYmxvY2tzIG9mIHNhbWUgY29sb3IuXG4gICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoIC0gMTsgeSsrKVxuICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTsgeCsrKVxuICAgICAgICBpZiAoKHFyZnJhbWVbeCArIHdpZHRoICogeV0gJiYgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiB5XVxuICAgICAgICAgICYmIHFyZnJhbWVbeCArIHdpZHRoICogKHkgKyAxKV0gJiYgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiAoeSArIDEpXSkgLy8gYWxsIGJsYWNrXG4gICAgICAgICAgfHwgIShxcmZyYW1lW3ggKyB3aWR0aCAqIHldIHx8IHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogeV1cbiAgICAgICAgICAgIHx8IHFyZnJhbWVbeCArIHdpZHRoICogKHkgKyAxKV0gfHwgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiAoeSArIDEpXSkpIC8vIGFsbCB3aGl0ZVxuICAgICAgICAgIHRoaXNiYWQgKz0gTjI7XG5cbiAgICAvLyBYIHJ1bnNcbiAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKykge1xuICAgICAgcmxlbnNbMF0gPSAwO1xuICAgICAgZm9yIChoID0gYiA9IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICBpZiAoKGIxID0gcXJmcmFtZVt4ICsgd2lkdGggKiB5XSkgPT0gYilcbiAgICAgICAgICBybGVuc1toXSsrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmxlbnNbKytoXSA9IDE7XG4gICAgICAgIGIgPSBiMTtcbiAgICAgICAgYncgKz0gYiA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIHRoaXNiYWQgKz0gYmFkcnVucyhoKTtcbiAgICB9XG5cbiAgICAvLyBibGFjay93aGl0ZSBpbWJhbGFuY2VcbiAgICBpZiAoYncgPCAwKVxuICAgICAgYncgPSAtYnc7XG5cbiAgICB2YXIgYmlnID0gYnc7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICBiaWcgKz0gYmlnIDw8IDI7XG4gICAgYmlnIDw8PSAxO1xuICAgIHdoaWxlIChiaWcgPiB3aWR0aCAqIHdpZHRoKVxuICAgICAgYmlnIC09IHdpZHRoICogd2lkdGgsIGNvdW50Kys7XG4gICAgdGhpc2JhZCArPSBjb3VudCAqIE40O1xuXG4gICAgLy8gWSBydW5zXG4gICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgIHJsZW5zWzBdID0gMDtcbiAgICAgIGZvciAoaCA9IGIgPSB5ID0gMDsgeSA8IHdpZHRoOyB5KyspIHtcbiAgICAgICAgaWYgKChiMSA9IHFyZnJhbWVbeCArIHdpZHRoICogeV0pID09IGIpXG4gICAgICAgICAgcmxlbnNbaF0rKztcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJsZW5zWysraF0gPSAxO1xuICAgICAgICBiID0gYjE7XG4gICAgICB9XG4gICAgICB0aGlzYmFkICs9IGJhZHJ1bnMoaCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzYmFkO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZnJhbWUoaW5zdHJpbmcpIHtcbiAgICB2YXIgeCwgeSwgaywgdCwgdiwgaSwgaiwgbTtcblxuICAgIC8vIGZpbmQgdGhlIHNtYWxsZXN0IHZlcnNpb24gdGhhdCBmaXRzIHRoZSBzdHJpbmdcbiAgICB0ID0gaW5zdHJpbmcubGVuZ3RoO1xuICAgIHZlcnNpb24gPSAwO1xuICAgIGRvIHtcbiAgICAgIHZlcnNpb24rKztcbiAgICAgIGsgPSAoZWNjbGV2ZWwgLSAxKSAqIDQgKyAodmVyc2lvbiAtIDEpICogMTY7XG4gICAgICBuZWNjYmxrMSA9IGVjY2Jsb2Nrc1trKytdO1xuICAgICAgbmVjY2JsazIgPSBlY2NibG9ja3NbaysrXTtcbiAgICAgIGRhdGFibGt3ID0gZWNjYmxvY2tzW2srK107XG4gICAgICBlY2NibGt3aWQgPSBlY2NibG9ja3Nba107XG4gICAgICBrID0gZGF0YWJsa3cgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMiAtIDMgKyAodmVyc2lvbiA8PSA5KTtcbiAgICAgIGlmICh0IDw9IGspXG4gICAgICAgIGJyZWFrO1xuICAgIH0gd2hpbGUgKHZlcnNpb24gPCA0MCk7XG5cbiAgICAvLyBGSVhNRSAtIGluc3VyZSB0aGF0IGl0IGZpdHMgaW5zdGVkIG9mIGJlaW5nIHRydW5jYXRlZFxuICAgIHdpZHRoID0gMTcgKyA0ICogdmVyc2lvbjtcblxuICAgIC8vIGFsbG9jYXRlLCBjbGVhciBhbmQgc2V0dXAgZGF0YSBzdHJ1Y3R1cmVzXG4gICAgdiA9IGRhdGFibGt3ICsgKGRhdGFibGt3ICsgZWNjYmxrd2lkKSAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyO1xuICAgIGZvciAodCA9IDA7IHQgPCB2OyB0KyspXG4gICAgICBlY2NidWZbdF0gPSAwO1xuICAgIHN0cmluYnVmID0gaW5zdHJpbmcuc2xpY2UoMCk7XG5cbiAgICBmb3IgKHQgPSAwOyB0IDwgd2lkdGggKiB3aWR0aDsgdCsrKVxuICAgICAgcXJmcmFtZVt0XSA9IDA7XG5cbiAgICBmb3IgKHQgPSAwOyB0IDwgKHdpZHRoICogKHdpZHRoICsgMSkgKyAxKSAvIDI7IHQrKylcbiAgICAgIGZyYW1hc2tbdF0gPSAwO1xuXG4gICAgLy8gaW5zZXJ0IGZpbmRlcnMgLSBibGFjayB0byBmcmFtZSwgd2hpdGUgdG8gbWFza1xuICAgIGZvciAodCA9IDA7IHQgPCAzOyB0KyspIHtcbiAgICAgIGsgPSAwO1xuICAgICAgeSA9IDA7XG4gICAgICBpZiAodCA9PSAxKVxuICAgICAgICBrID0gKHdpZHRoIC0gNyk7XG4gICAgICBpZiAodCA9PSAyKVxuICAgICAgICB5ID0gKHdpZHRoIC0gNyk7XG4gICAgICBxcmZyYW1lWyh5ICsgMykgKyB3aWR0aCAqIChrICsgMyldID0gMTtcbiAgICAgIGZvciAoeCA9IDA7IHggPCA2OyB4KyspIHtcbiAgICAgICAgcXJmcmFtZVsoeSArIHgpICsgd2lkdGggKiBrXSA9IDE7XG4gICAgICAgIHFyZnJhbWVbeSArIHdpZHRoICogKGsgKyB4ICsgMSldID0gMTtcbiAgICAgICAgcXJmcmFtZVsoeSArIDYpICsgd2lkdGggKiAoayArIHgpXSA9IDE7XG4gICAgICAgIHFyZnJhbWVbKHkgKyB4ICsgMSkgKyB3aWR0aCAqIChrICsgNildID0gMTtcbiAgICAgIH1cbiAgICAgIGZvciAoeCA9IDE7IHggPCA1OyB4KyspIHtcbiAgICAgICAgc2V0bWFzayh5ICsgeCwgayArIDEpO1xuICAgICAgICBzZXRtYXNrKHkgKyAxLCBrICsgeCArIDEpO1xuICAgICAgICBzZXRtYXNrKHkgKyA1LCBrICsgeCk7XG4gICAgICAgIHNldG1hc2soeSArIHggKyAxLCBrICsgNSk7XG4gICAgICB9XG4gICAgICBmb3IgKHggPSAyOyB4IDwgNDsgeCsrKSB7XG4gICAgICAgIHFyZnJhbWVbKHkgKyB4KSArIHdpZHRoICogKGsgKyAyKV0gPSAxO1xuICAgICAgICBxcmZyYW1lWyh5ICsgMikgKyB3aWR0aCAqIChrICsgeCArIDEpXSA9IDE7XG4gICAgICAgIHFyZnJhbWVbKHkgKyA0KSArIHdpZHRoICogKGsgKyB4KV0gPSAxO1xuICAgICAgICBxcmZyYW1lWyh5ICsgeCArIDEpICsgd2lkdGggKiAoayArIDQpXSA9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWxpZ25tZW50IGJsb2Nrc1xuICAgIGlmICh2ZXJzaW9uID4gMSkge1xuICAgICAgdCA9IGFkZWx0YVt2ZXJzaW9uXTtcbiAgICAgIHkgPSB3aWR0aCAtIDc7XG4gICAgICBmb3IgKDsgOykge1xuICAgICAgICB4ID0gd2lkdGggLSA3O1xuICAgICAgICB3aGlsZSAoeCA+IHQgLSAzKSB7XG4gICAgICAgICAgcHV0YWxpZ24oeCwgeSk7XG4gICAgICAgICAgaWYgKHggPCB0KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgeCAtPSB0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh5IDw9IHQgKyA5KVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB5IC09IHQ7XG4gICAgICAgIHB1dGFsaWduKDYsIHkpO1xuICAgICAgICBwdXRhbGlnbih5LCA2KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaW5nbGUgYmxhY2tcbiAgICBxcmZyYW1lWzggKyB3aWR0aCAqICh3aWR0aCAtIDgpXSA9IDE7XG5cbiAgICAvLyB0aW1pbmcgZ2FwIC0gbWFzayBvbmx5XG4gICAgZm9yICh5ID0gMDsgeSA8IDc7IHkrKykge1xuICAgICAgc2V0bWFzayg3LCB5KTtcbiAgICAgIHNldG1hc2sod2lkdGggLSA4LCB5KTtcbiAgICAgIHNldG1hc2soNywgeSArIHdpZHRoIC0gNyk7XG4gICAgfVxuICAgIGZvciAoeCA9IDA7IHggPCA4OyB4KyspIHtcbiAgICAgIHNldG1hc2soeCwgNyk7XG4gICAgICBzZXRtYXNrKHggKyB3aWR0aCAtIDgsIDcpO1xuICAgICAgc2V0bWFzayh4LCB3aWR0aCAtIDgpO1xuICAgIH1cblxuICAgIC8vIHJlc2VydmUgbWFzay1mb3JtYXQgYXJlYVxuICAgIGZvciAoeCA9IDA7IHggPCA5OyB4KyspXG4gICAgICBzZXRtYXNrKHgsIDgpO1xuICAgIGZvciAoeCA9IDA7IHggPCA4OyB4KyspIHtcbiAgICAgIHNldG1hc2soeCArIHdpZHRoIC0gOCwgOCk7XG4gICAgICBzZXRtYXNrKDgsIHgpO1xuICAgIH1cbiAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKVxuICAgICAgc2V0bWFzayg4LCB5ICsgd2lkdGggLSA3KTtcblxuICAgIC8vIHRpbWluZyByb3cvY29sXG4gICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTQ7IHgrKylcbiAgICAgIGlmICh4ICYgMSkge1xuICAgICAgICBzZXRtYXNrKDggKyB4LCA2KTtcbiAgICAgICAgc2V0bWFzayg2LCA4ICsgeCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcXJmcmFtZVsoOCArIHgpICsgd2lkdGggKiA2XSA9IDE7XG4gICAgICAgIHFyZnJhbWVbNiArIHdpZHRoICogKDggKyB4KV0gPSAxO1xuICAgICAgfVxuXG4gICAgLy8gdmVyc2lvbiBibG9ja1xuICAgIGlmICh2ZXJzaW9uID4gNikge1xuICAgICAgdCA9IHZwYXRbdmVyc2lvbiAtIDddO1xuICAgICAgayA9IDE3O1xuICAgICAgZm9yICh4ID0gMDsgeCA8IDY7IHgrKylcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IDM7IHkrKyAsIGstLSlcbiAgICAgICAgICBpZiAoMSAmIChrID4gMTEgPyB2ZXJzaW9uID4+IChrIC0gMTIpIDogdCA+PiBrKSkge1xuICAgICAgICAgICAgcXJmcmFtZVsoNSAtIHgpICsgd2lkdGggKiAoMiAtIHkgKyB3aWR0aCAtIDExKV0gPSAxO1xuICAgICAgICAgICAgcXJmcmFtZVsoMiAtIHkgKyB3aWR0aCAtIDExKSArIHdpZHRoICogKDUgLSB4KV0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldG1hc2soNSAtIHgsIDIgLSB5ICsgd2lkdGggLSAxMSk7XG4gICAgICAgICAgICBzZXRtYXNrKDIgLSB5ICsgd2lkdGggLSAxMSwgNSAtIHgpO1xuICAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzeW5jIG1hc2sgYml0cyAtIG9ubHkgc2V0IGFib3ZlIGZvciB3aGl0ZSBzcGFjZXMsIHNvIGFkZCBpbiBibGFjayBiaXRzXG4gICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXG4gICAgICBmb3IgKHggPSAwOyB4IDw9IHk7IHgrKylcbiAgICAgICAgaWYgKHFyZnJhbWVbeCArIHdpZHRoICogeV0pXG4gICAgICAgICAgc2V0bWFzayh4LCB5KTtcblxuICAgIC8vIGNvbnZlcnQgc3RyaW5nIHRvIGJpdHN0cmVhbVxuICAgIC8vIDggYml0IGRhdGEgdG8gUVItY29kZWQgOCBiaXQgZGF0YSAobnVtZXJpYyBvciBhbHBoYW51bSwgb3Iga2Fuamkgbm90IHN1cHBvcnRlZClcbiAgICB2ID0gc3RyaW5idWYubGVuZ3RoO1xuXG4gICAgLy8gc3RyaW5nIHRvIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IHY7IGkrKylcbiAgICAgIGVjY2J1ZltpXSA9IHN0cmluYnVmLmNoYXJDb2RlQXQoaSk7XG4gICAgc3RyaW5idWYgPSBlY2NidWYuc2xpY2UoMCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgbWF4IHN0cmluZyBsZW5ndGhcbiAgICB4ID0gZGF0YWJsa3cgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcbiAgICBpZiAodiA+PSB4IC0gMikge1xuICAgICAgdiA9IHggLSAyO1xuICAgICAgaWYgKHZlcnNpb24gPiA5KVxuICAgICAgICB2LS07XG4gICAgfVxuXG4gICAgLy8gc2hpZnQgYW5kIHJlcGFjayB0byBpbnNlcnQgbGVuZ3RoIHByZWZpeFxuICAgIGkgPSB2O1xuICAgIGlmICh2ZXJzaW9uID4gOSkge1xuICAgICAgc3RyaW5idWZbaSArIDJdID0gMDtcbiAgICAgIHN0cmluYnVmW2kgKyAzXSA9IDA7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcbiAgICAgICAgc3RyaW5idWZbaSArIDNdIHw9IDI1NSAmICh0IDw8IDQpO1xuICAgICAgICBzdHJpbmJ1ZltpICsgMl0gPSB0ID4+IDQ7XG4gICAgICB9XG4gICAgICBzdHJpbmJ1ZlsyXSB8PSAyNTUgJiAodiA8PCA0KTtcbiAgICAgIHN0cmluYnVmWzFdID0gdiA+PiA0O1xuICAgICAgc3RyaW5idWZbMF0gPSAweDQwIHwgKHYgPj4gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN0cmluYnVmW2kgKyAxXSA9IDA7XG4gICAgICBzdHJpbmJ1ZltpICsgMl0gPSAwO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB0ID0gc3RyaW5idWZbaV07XG4gICAgICAgIHN0cmluYnVmW2kgKyAyXSB8PSAyNTUgJiAodCA8PCA0KTtcbiAgICAgICAgc3RyaW5idWZbaSArIDFdID0gdCA+PiA0O1xuICAgICAgfVxuICAgICAgc3RyaW5idWZbMV0gfD0gMjU1ICYgKHYgPDwgNCk7XG4gICAgICBzdHJpbmJ1ZlswXSA9IDB4NDAgfCAodiA+PiA0KTtcbiAgICB9XG4gICAgLy8gZmlsbCB0byBlbmQgd2l0aCBwYWQgcGF0dGVyblxuICAgIGkgPSB2ICsgMyAtICh2ZXJzaW9uIDwgMTApO1xuICAgIHdoaWxlIChpIDwgeCkge1xuICAgICAgc3RyaW5idWZbaSsrXSA9IDB4ZWM7XG4gICAgICAvLyBidWZmZXIgaGFzIHJvb20gICAgaWYgKGkgPT0geCkgICAgICBicmVhaztcbiAgICAgIHN0cmluYnVmW2krK10gPSAweDExO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBhbmQgYXBwZW5kIEVDQ1xuXG4gICAgLy8gY2FsY3VsYXRlIGdlbmVyYXRvciBwb2x5bm9taWFsXG4gICAgZ2VucG9seVswXSA9IDE7XG4gICAgZm9yIChpID0gMDsgaSA8IGVjY2Jsa3dpZDsgaSsrKSB7XG4gICAgICBnZW5wb2x5W2kgKyAxXSA9IDE7XG4gICAgICBmb3IgKGogPSBpOyBqID4gMDsgai0tKVxuICAgICAgICBnZW5wb2x5W2pdID0gZ2VucG9seVtqXVxuICAgICAgICAgID8gZ2VucG9seVtqIC0gMV0gXiBnZXhwW21vZG5uKGdsb2dbZ2VucG9seVtqXV0gKyBpKV0gOiBnZW5wb2x5W2ogLSAxXTtcbiAgICAgIGdlbnBvbHlbMF0gPSBnZXhwW21vZG5uKGdsb2dbZ2VucG9seVswXV0gKyBpKV07XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPD0gZWNjYmxrd2lkOyBpKyspXG4gICAgICBnZW5wb2x5W2ldID0gZ2xvZ1tnZW5wb2x5W2ldXTsgLy8gdXNlIGxvZ3MgZm9yIGdlbnBvbHlbXSB0byBzYXZlIGNhbGMgc3RlcFxuXG4gICAgLy8gYXBwZW5kIGVjYyB0byBkYXRhIGJ1ZmZlclxuICAgIGsgPSB4O1xuICAgIHkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuZWNjYmxrMTsgaSsrKSB7XG4gICAgICBhcHBlbmRycyh5LCBkYXRhYmxrdywgaywgZWNjYmxrd2lkKTtcbiAgICAgIHkgKz0gZGF0YWJsa3c7XG4gICAgICBrICs9IGVjY2Jsa3dpZDtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IG5lY2NibGsyOyBpKyspIHtcbiAgICAgIGFwcGVuZHJzKHksIGRhdGFibGt3ICsgMSwgaywgZWNjYmxrd2lkKTtcbiAgICAgIHkgKz0gZGF0YWJsa3cgKyAxO1xuICAgICAgayArPSBlY2NibGt3aWQ7XG4gICAgfVxuICAgIC8vIGludGVybGVhdmUgYmxvY2tzXG4gICAgeSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGRhdGFibGt3OyBpKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuZWNjYmxrMTsgaisrKVxuICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmW2kgKyBqICogZGF0YWJsa3ddO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsyOyBqKyspXG4gICAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbKG5lY2NibGsxICogZGF0YWJsa3cpICsgaSArIChqICogKGRhdGFibGt3ICsgMSkpXTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsyOyBqKyspXG4gICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmWyhuZWNjYmxrMSAqIGRhdGFibGt3KSArIGkgKyAoaiAqIChkYXRhYmxrdyArIDEpKV07XG4gICAgZm9yIChpID0gMDsgaSA8IGVjY2Jsa3dpZDsgaSsrKVxuICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsxICsgbmVjY2JsazI7IGorKylcbiAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1Zlt4ICsgaSArIGogKiBlY2NibGt3aWRdO1xuICAgIHN0cmluYnVmID0gZWNjYnVmO1xuXG4gICAgLy8gcGFjayBiaXRzIGludG8gZnJhbWUgYXZvaWRpbmcgbWFza2VkIGFyZWEuXG4gICAgeCA9IHkgPSB3aWR0aCAtIDE7XG4gICAgayA9IHYgPSAxOyAgICAgICAgIC8vIHVwLCBtaW51c1xuICAgIC8qIGludGVsZWF2ZWQgZGF0YSBhbmQgZWNjIGNvZGVzICovXG4gICAgbSA9IChkYXRhYmxrdyArIGVjY2Jsa3dpZCkgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbTsgaSsrKSB7XG4gICAgICB0ID0gc3RyaW5idWZbaV07XG4gICAgICBmb3IgKGogPSAwOyBqIDwgODsgaisrICwgdCA8PD0gMSkge1xuICAgICAgICBpZiAoMHg4MCAmIHQpXG4gICAgICAgICAgcXJmcmFtZVt4ICsgd2lkdGggKiB5XSA9IDE7XG4gICAgICAgIGRvIHsgICAgICAgIC8vIGZpbmQgbmV4dCBmaWxsIHBvc2l0aW9uXG4gICAgICAgICAgaWYgKHYpXG4gICAgICAgICAgICB4LS07XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4Kys7XG4gICAgICAgICAgICBpZiAoaykge1xuICAgICAgICAgICAgICBpZiAoeSAhPSAwKVxuICAgICAgICAgICAgICAgIHktLTtcbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeCAtPSAyO1xuICAgICAgICAgICAgICAgIGsgPSAhaztcbiAgICAgICAgICAgICAgICBpZiAoeCA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICB4LS07XG4gICAgICAgICAgICAgICAgICB5ID0gOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoeSAhPSB3aWR0aCAtIDEpXG4gICAgICAgICAgICAgICAgeSsrO1xuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4IC09IDI7XG4gICAgICAgICAgICAgICAgayA9ICFrO1xuICAgICAgICAgICAgICAgIGlmICh4ID09IDYpIHtcbiAgICAgICAgICAgICAgICAgIHgtLTtcbiAgICAgICAgICAgICAgICAgIHkgLT0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdiA9ICF2O1xuICAgICAgICB9IHdoaWxlIChpc21hc2tlZCh4LCB5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2F2ZSBwcmUtbWFzayBjb3B5IG9mIGZyYW1lXG4gICAgc3RyaW5idWYgPSBxcmZyYW1lLnNsaWNlKDApO1xuICAgIHQgPSAwOyAgICAgICAgICAgLy8gYmVzdFxuICAgIHkgPSAzMDAwMDsgICAgICAgICAvLyBkZW1lcml0XG4gICAgLy8gZm9yIGluc3RlYWQgb2Ygd2hpbGUgc2luY2UgaW4gb3JpZ2luYWwgYXJkdWlubyBjb2RlXG4gICAgLy8gaWYgYW4gZWFybHkgbWFzayB3YXMgXCJnb29kIGVub3VnaFwiIGl0IHdvdWxkbid0IHRyeSBmb3IgYSBiZXR0ZXIgb25lXG4gICAgLy8gc2luY2UgdGhleSBnZXQgbW9yZSBjb21wbGV4IGFuZCB0YWtlIGxvbmdlci5cbiAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrKSB7XG4gICAgICBhcHBseW1hc2soayk7ICAgICAgLy8gcmV0dXJucyBibGFjay13aGl0ZSBpbWJhbGFuY2VcbiAgICAgIHggPSBiYWRjaGVjaygpO1xuICAgICAgaWYgKHggPCB5KSB7IC8vIGN1cnJlbnQgbWFzayBiZXR0ZXIgdGhhbiBwcmV2aW91cyBiZXN0P1xuICAgICAgICB5ID0geDtcbiAgICAgICAgdCA9IGs7XG4gICAgICB9XG4gICAgICBpZiAodCA9PSA3KVxuICAgICAgICBicmVhazsgICAgICAgLy8gZG9uJ3QgaW5jcmVtZW50IGkgdG8gYSB2b2lkIHJlZG9pbmcgbWFza1xuICAgICAgcXJmcmFtZSA9IHN0cmluYnVmLnNsaWNlKDApOyAvLyByZXNldCBmb3IgbmV4dCBwYXNzXG4gICAgfVxuICAgIGlmICh0ICE9IGspICAgICAgICAgLy8gcmVkbyBiZXN0IG1hc2sgLSBub25lIGdvb2QgZW5vdWdoLCBsYXN0IHdhc24ndCB0XG4gICAgICBhcHBseW1hc2sodCk7XG5cbiAgICAvLyBhZGQgaW4gZmluYWwgbWFzay9lY2NsZXZlbCBieXRlc1xuICAgIHkgPSBmbXR3b3JkW3QgKyAoKGVjY2xldmVsIC0gMSkgPDwgMyldO1xuICAgIC8vIGxvdyBieXRlXG4gICAgZm9yIChrID0gMDsgayA8IDg7IGsrKyAsIHkgPj49IDEpXG4gICAgICBpZiAoeSAmIDEpIHtcbiAgICAgICAgcXJmcmFtZVsod2lkdGggLSAxIC0gaykgKyB3aWR0aCAqIDhdID0gMTtcbiAgICAgICAgaWYgKGsgPCA2KVxuICAgICAgICAgIHFyZnJhbWVbOCArIHdpZHRoICoga10gPSAxO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAoayArIDEpXSA9IDE7XG4gICAgICB9XG4gICAgLy8gaGlnaCBieXRlXG4gICAgZm9yIChrID0gMDsgayA8IDc7IGsrKyAsIHkgPj49IDEpXG4gICAgICBpZiAoeSAmIDEpIHtcbiAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAod2lkdGggLSA3ICsgayldID0gMTtcbiAgICAgICAgaWYgKGspXG4gICAgICAgICAgcXJmcmFtZVsoNiAtIGspICsgd2lkdGggKiA4XSA9IDE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBxcmZyYW1lWzcgKyB3aWR0aCAqIDhdID0gMTtcbiAgICAgIH1cbiAgICByZXR1cm4gcXJmcmFtZTtcbiAgfVxuXG5cblxuXG4gIHZhciBfY2FudmFzID0gbnVsbDtcblxuICB2YXIgYXBpID0ge1xuXG4gICAgZ2V0IGVjY2xldmVsKCkge1xuICAgICAgcmV0dXJuIGVjY2xldmVsO1xuICAgIH0sXG5cbiAgICBzZXQgZWNjbGV2ZWwodmFsKSB7XG4gICAgICBlY2NsZXZlbCA9IHZhbDtcbiAgICB9LFxuXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gX3NpemU7XG4gICAgfSxcblxuICAgIHNldCBzaXplKHZhbCkge1xuICAgICAgX3NpemUgPSB2YWxcbiAgICB9LFxuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgIHJldHVybiBfY2FudmFzO1xuICAgIH0sXG5cbiAgICBzZXQgY2FudmFzKGVsKSB7XG4gICAgICBfY2FudmFzID0gZWw7XG4gICAgfSxcblxuICAgIGdldEZyYW1lOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICByZXR1cm4gZ2VuZnJhbWUoc3RyaW5nKTtcbiAgICB9LFxuICAgIC8v6L+Z6YeM55qEdXRmMTZ0bzgoc3RyKeaYr+WvuVRleHTkuK3nmoTlrZfnrKbkuLLov5vooYzovaznoIHvvIzorqnlhbbmlK/mjIHkuK3mlodcbiAgICB1dGYxNnRvODogZnVuY3Rpb24gKHN0cikge1xuICAgICAgdmFyIG91dCwgaSwgbGVuLCBjO1xuXG4gICAgICBvdXQgPSBcIlwiO1xuICAgICAgbGVuID0gc3RyLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmICgoYyA+PSAweDAwMDEpICYmIChjIDw9IDB4MDA3RikpIHtcbiAgICAgICAgICBvdXQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfSBlbHNlIGlmIChjID4gMHgwN0ZGKSB7XG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhFMCB8ICgoYyA+PiAxMikgJiAweDBGKSk7XG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpKTtcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDgwIHwgKChjID4+IDApICYgMHgzRikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4QzAgfCAoKGMgPj4gNikgJiAweDFGKSk7XG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHg4MCB8ICgoYyA+PiAwKSAmIDB4M0YpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOaWsOWiniR0aGlz5Y+C5pWw77yM5Lyg5YWl57uE5Lu255qEdGhpcyzlhbzlrrnlnKjnu4Tku7bkuK3nlJ/miJBcbiAgICAgKiBAcGFyYW0gYmcg55uu5YmN5Y+q6IO96K6+572u6aKc6Imy5YC8XG4gICAgICovIFxuICAgIGRyYXc6IGZ1bmN0aW9uIChzdHIsIGN0eCwgc3RhcnRYLCBzdGFydFksIGNhdlcsIGNhdkgsIGJnLCBjb2xvciwgJHRoaXMsIGVjYykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgZWNjbGV2ZWwgPSBlY2MgfHwgZWNjbGV2ZWw7XG4gICAgICBpZiAoIWN0eCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ05vIGNhbnZhcyBwcm92aWRlZCB0byBkcmF3IFFSIGNvZGUgaW4hJylcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHNpemUgPSBNYXRoLm1pbihjYXZXLCBjYXZIKTtcbiAgICAgIHN0ciA9IHRoYXQudXRmMTZ0bzgoc3RyKTsvL+WinuWKoOS4reaWh+aYvuekulxuXG4gICAgICB2YXIgZnJhbWUgPSB0aGF0LmdldEZyYW1lKHN0cik7XG4gICAgICB2YXIgcHggPSBzaXplIC8gd2lkdGg7XG4gICAgICBpZiAoYmcpIHtcbiAgICAgICAgY3R4LnNldEZpbGxTdHlsZShiZylcbiAgICAgICAgY3R4LmZpbGxSZWN0KHN0YXJ0WCwgc3RhcnRZLCBjYXZXLCBjYXZXKTtcbiAgICAgIH1cbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoY29sb3IgfHwgJ2JsYWNrJyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGZyYW1lW2ogKiB3aWR0aCArIGldKSB7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3Qoc3RhcnRYICsgcHggKiBpLCBzdGFydFkgKyBweCAqIGosIHB4LCBweCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG1vZHVsZS5leHBvcnRzID0geyBhcGkgfVxuICAvLyBleHBvcnRzLmRyYXcgPSBhcGk7XG5cbn0pKCk7Il19