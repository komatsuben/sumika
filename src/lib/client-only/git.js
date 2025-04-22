import LightningFS from '@isomorphic-git/lightning-fs';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';

const fs = new LightningFS('tenkai-fs');
const dir = '/docs';
const pfs = fs.promises;

await git.clone({
    fs: pfs,
    http,
    dir,
    url: 'https://github.com/komatsuben/tenkai',
    corsProxy: 'https://cors.isomorphic-git.org',
    singleBranch: true,
    depth: 1,
});

export async function initRepo() {
    try {
        await pfs.mkdir(dir);
    } catch (_) {}
    await git.init({ fs, dir });
    return { fs, dir, git, http };
}
