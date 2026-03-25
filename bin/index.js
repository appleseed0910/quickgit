#!/usr/bin/env node

import { exec, execFile } from 'child_process'
import { promisify } from 'util'

const execFilePromise = promisify(execFile)
const msg = process.argv[2] ?? ''

try {
    if (!msg) {
        throw new Error('Empty commit message!') 
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