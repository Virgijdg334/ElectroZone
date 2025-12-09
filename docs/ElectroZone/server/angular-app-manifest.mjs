
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/electrozone/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/electrozone"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5166, hash: 'bd4396778323036a2d4541bc5c8af27a1d6c4b44c9d8941e4792e3edb2495f1a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5494, hash: 'cbe336a30c34dadebc9058e59e58bf282fa7e3ab40598168f7a1d2a910fbf33c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 81689, hash: 'a976aaa1326d4ef4c82128d5c220308ed130cfee438851e1555ae27f76acace6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-P3SM2SCG.css': {size: 60, hash: 'vcFNwsquGFs', text: () => import('./assets-chunks/styles-P3SM2SCG_css.mjs').then(m => m.default)}
  },
};
