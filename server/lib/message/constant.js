exports.msg = {
  mark: '',
  devId: '',
  msgId: '',
  state: '',
  length: '',
  check: '',
  sn: '',
  encryption: '',
  pkgSN: '',
  pkgNo: '',
  resave: '',
  body: '',
  raw: '',
  bodyLen: ''
}
exports.msgFixed = {
  devId: '',
  msgId: '',
  state: ''
}
exports.state = [
  0b00000001,
  0b00000010,
  0b00000100,
  0b00001000,
  0b00010000,
  0b00100000,
  0b01000000,
  0b10000000
]
exports.headMark = 0xfeef

exports.msgId = {}

exports.serverId = 0x000000000000
exports.header = {
  correct: 'feef0000000000003121',
  error: 'feef0000000000003021',
  timeout: 'feef0000000000003220'
}
