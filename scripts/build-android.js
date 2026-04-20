const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.resolve(__dirname, '..');
const BUILD_GRADLE_PATH = path.join(PROJECT_DIR, 'android', 'app', 'build.gradle');

console.log('📱 Android Build Script');
console.log('======================');

// Read build.gradle
let buildGradleContent = fs.readFileSync(BUILD_GRADLE_PATH, 'utf8');

// Get current version
const versionNameMatch = buildGradleContent.match(/versionName\s+"([^"]+)"/);
const versionCodeMatch = buildGradleContent.match(/versionCode\s+(\d+)/);

if (!versionNameMatch || !versionCodeMatch) {
  console.error('❌ Could not find versionName or versionCode in build.gradle');
  process.exit(1);
}

const currentVersionName = versionNameMatch[1];
const currentVersionCode = parseInt(versionCodeMatch[1], 10);

console.log(`Current version: ${currentVersionName} (code: ${currentVersionCode})`);

// Parse version (format: X.X.X.X)
const versionParts = currentVersionName.split('.').map(Number);
if (versionParts.length !== 4) {
  console.error('❌ Version must be in format X.X.X.X');
  process.exit(1);
}

// Increment last digit
versionParts[3] += 1;
const newVersionName = versionParts.join('.');
const newVersionCode = currentVersionCode + 1;

console.log(`New version: ${newVersionName} (code: ${newVersionCode})`);

// Update build.gradle
buildGradleContent = buildGradleContent.replace(/versionName\s+"[^"]+"/, `versionName "${newVersionName}"`);
buildGradleContent = buildGradleContent.replace(/versionCode\s+\d+/, `versionCode ${newVersionCode}`);

fs.writeFileSync(BUILD_GRADLE_PATH, buildGradleContent);
console.log('✅ Version updated in build.gradle');

// Run gradle commands
const androidDir = path.join(PROJECT_DIR, 'android');

console.log('');
console.log('🧹 Running: ./gradlew clean');
execSync('./gradlew clean', { cwd: androidDir, stdio: 'inherit' });

console.log('');
console.log('📦 Running: ./gradlew bundleRelease');
execSync('./gradlew bundleRelease', { cwd: androidDir, stdio: 'inherit' });

console.log('');
console.log('✅ Build complete!');
console.log(`Output: ${path.join(androidDir, 'app', 'build', 'outputs', 'bundle', 'release')}`);
console.log(`Version: ${newVersionName} (${newVersionCode})`);
