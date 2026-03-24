#!/usr/bin/env node

import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)
const msg = process.argv[2]

try {
    await execPromise('git add :/')
    const { stdout: commitout, stderr: commiterr } = await execPromise(`git commit -m "${msg}"`)
    const { stdout, stderr } = await execPromise('git push')
    console.log(commitout);
    console.log(stdout);
    if (commiterr) console.error(commiterr);
    if (stderr) console.error(stderr);
} catch (e) {
    console.error(e?.message);
}