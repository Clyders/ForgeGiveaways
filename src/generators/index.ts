// @ts-nocheck
import { GIVEAWAY_STORAGE_NAME } from '../index'
import { generateMetadata } from 'forgescript'
import { join } from 'path'

generateMetadata(
    join(process.cwd(), './dist/natives'),
    'functions',
    GIVEAWAY_STORAGE_NAME,
    undefined,
    undefined,
    join(process.cwd(), './dist/events')
)