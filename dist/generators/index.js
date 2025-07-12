"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const index_1 = require("../index");
const forgescript_1 = require("@tryforge/forgescript");
const path_1 = require("path");
(0, forgescript_1.generateMetadata)((0, path_1.join)(process.cwd(), './dist/natives'), 'functions', index_1.GIVEAWAY_STORAGE_NAME, undefined, undefined, (0, path_1.join)(process.cwd(), './dist/events'));
