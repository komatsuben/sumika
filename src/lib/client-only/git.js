import * as git from 'isomorphic-git';
import LightningFS from '@isomorphic-git/lightning-fs';

const fs = new LightningFS('fs');
const pfs = fs.promises;

const dir = '/repo';

export async function initRepo() {
    try {
        await pfs.mkdir(dir);
    } catch (_) {
        // already exists
    }

    await git.init({ fs, dir });
    return { fs, dir };
}

export { git, fs, dir };
