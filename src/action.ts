import * as fs from 'fs'
import * as os from 'os'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as glob from 'glob'
// @ts-ignore
import * as path from 'path'

async function downloadUpx(): Promise<string> {
  const upx_version = '4.2.2'
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'upx-action-'))
  if (os.type() == 'Linux') {
    await exec.exec(
      'curl',
      [
        '-LO',
        `https://github.com/upx/upx/releases/download/v${upx_version}/upx-${upx_version}-amd64_linux.tar.xz`
      ],
      {cwd: tmpdir}
    )
    await exec.exec(
      'tar',
      [
        'xvJf',
        `upx-${upx_version}-amd64_linux.tar.xz`,
        '--strip-components=1',
        `upx-${upx_version}-amd64_linux/upx`
      ],
      {cwd: tmpdir}
    )
    return `${tmpdir}/upx`
  } else if (os.type() == 'Darwin') {
    await exec.exec(`brew install upx`)
    return 'upx'
  } else if (os.type() == 'Windows_NT') {
    await exec.exec(`choco install upx --no-progress --version=${upx_version}`)
    return 'upx'
  }
  throw 'unsupported OS'
}

export async function run(): Promise<void> {
  try {
    core.info('Downloading UPX...')
    await downloadUpx()
  } catch (error: any) {
    core.setFailed(error.message)
    throw error
  }
}
