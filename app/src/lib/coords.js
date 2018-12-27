const LBHtoXYZ = LBH => {
  let a = 6378137.0 //椭球的长轴
  let b = 6356752.3142 //椭球的短轴
  let PI = 3.14159265358979323846
  let e = Math.sqrt(a * a - b * b) / a //椭球的第一偏心率
  let W = Math.sqrt(
    1 -
      e *
        e *
        Math.sin((LBH.lat * PI) / 180.0) *
        Math.sin((LBH.lat * PI) / 180.0)
  )
  let N = a / W
  let ret = { x: '', y: '', z: '' }
  ret.x =
    (N + LBH.alt) *
    Math.cos((LBH.lat * PI) / 180.0) *
    Math.cos((LBH.lng * PI) / 180.0)
  ret.x = ret.x.toFixed(3)
  ret.y =
    (N + LBH.alt) *
    Math.cos((LBH.lat * PI) / 180.0) *
    Math.sin((LBH.lng * PI) / 180.0)
  ret.y = ret.y.toFixed(3)
  ret.z = (N * (1 - e * e) + LBH.alt) * Math.sin((LBH.lat * PI) / 180.0)
  ret.z = ret.z.toFixed(3)
  return ret
}

export { LBHtoXYZ }
