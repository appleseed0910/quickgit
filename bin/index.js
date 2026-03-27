#!/usr/bin/env node

import { execFile } from 'child_process'
import { promisify } from 'util'

const execFilePromise = promisify(execFile)
const msg = process.argv[2] ?? ''

const getLatestCommitMsg = async () => {
    try {
        const { stdout }  = await execFilePromise('git', ['show', '-s', '--format=%B'])
        return stdout.trim()
    } catch (e) {
        if (e?.stderr?.includes('does not have any commits yet')) {
            console.info('Attention: this is the first commit of your repo!')
            return ''
        }
        throw e
    }
}

const packRun = async () => {
    await execFilePromise('git', ['add', ':/'])
    const { stdout: commitout} = await execFilePromise('git', ['commit', '-m', msg])
    const { stdout } = await execFilePromise('git', ['push'])
    console.log(commitout);
    console.log(stdout);
}

const main = async () => {
    if (!msg.trim()) {
        throw new Error('Empty commit message!')
    }
    const latestMsg = await getLatestCommitMsg()
    if (msg === latestMsg.trim()) {
        throw new Error('You just committed with the same msg, you may want to double check if this is the expected cmd...')
    }
    await packRun()
}

main().catch(e => {
    console.error(e?.stderr || e?.message || e);
    process.exit(1)
})
