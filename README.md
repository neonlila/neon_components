neon_components
A collection of reusable components for TYPO3 v14.3, designed for modular content building and consistent frontend output.
Requirements
TYPO3: `14.3`
PHP: `8.2+` (or as required by your TYPO3 v14.3 environment)
Composer (recommended for extension installation)
Features
TYPO3 v14.3 Ready: Built for modern TYPO3 extension and template workflows.
Modular Components: Reusable elements structured for clean integration into site packages and pages.
Customizable Styling & Templates: Adaptable Fluid/TypoScript configuration and frontend assets.
Project Structure
```text
neon_components/
├── Configuration/        # TypoScript, TCA, site sets, and extension configuration
├── Resources/
│   ├── Private/          # Fluid templates, layouts, partials, and language files
│   └── Public/           # Compiled CSS, JS, and component assets
├── composer.json
├── ext_emconf.php
└── README.md
```
Installation
Via Composer
Install or require the extension in your TYPO3 project:
```bash
composer req neonlila/neon-components
```
If developing locally via a path repository in your root `composer.json`, add a `path` repository pointing to `neon_components` and run:
```bash
composer require neonlila/neon-components:@dev
```
Activate & Clear Caches
Enable the extension in TYPO3 if needed and flush all caches:
```bash
vendor/bin/typo3 cache:flush
```
Usage
1. Include TypoScript / Site Configuration
Include the `neon_components` TypoScript set or site set in your root page or site configuration so component settings, paths, and rendering definitions are loaded.
2. Render Components in Fluid
Include or render component partials/templates from your site package or page templates:
```html
<!-- Example Fluid usage — adjust partial name and arguments to match your components -->
<f:render partial="ComponentName" arguments="{data: data, settings: settings}" />
```
3. Map Content Elements / Backend Usage
Assign the components to your content elements, backend layouts, or site package templates according to your TYPO3 v14.3 site setup, then clear caches so TCA, TypoScript, and Fluid template caches are rebuilt.
Development
When making changes to TypoScript, TCA, or Fluid templates during development, flush caches to see updates immediately:
```bash
vendor/bin/typo3 cache:flush
```
License
Specify your license here (for example, `GPL-2.0-or-later` or `MIT`).
