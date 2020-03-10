export function getContext() {
  let ctx = navigator.userAgent;
  return ctx.indexOf('Android') > -1 ||
    ctx.indexOf('iPhone') > -1 ||
    ctx.indexOf('iPod') > -1 ||
    ctx.indexOf('Symbian') > -1;
}


