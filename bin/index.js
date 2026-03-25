#!/usr/bin/env node

import { execFile } from 'child_process'
import { promisify } from 'util'

const execFilePromise = promisify(execFile)
const msg = process.argv[2] ?? ''

try {
    if (!msg) {
        throw new Error('Empty commit message!') 
    }

    const { stdout: latestMsg, stderr: latestMsgErr } = await execFilePromise('git', ['show', '-s', '--format=%B'])
    
    if (msg === latestMsg.replaceAll('\n', '')) {
        throw new Error('You just committed with the same msg, you may want to double check if this is the expected cmd...')
    }

    await execFilePromise('git', ['add', ':/'])
    const { stdout: commitout, stderr: commiterr } = await execFilePromise('git', ['commit', '-m', msg])
    const { stdout, stderr } = await execFilePromise('git', ['push'])
    console.log(commitout);
    console.log(stdout);
    if (commiterr) console.error(commiterr);
    if (stderr) console.error(stderr);
} catch (e) {
    console.error(e?.message);
    process.exit(1)
}