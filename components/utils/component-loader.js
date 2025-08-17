/**
 * Component Loader - SOLID Module System
 * Load HTML components dynamically
 */

class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            
            const html = await response.text();
            const element = document.getElementById(elementId);
            
            if (element) {
                element.innerHTML = html;
                return true;
            }
            return false;
        } catch (error) {
            console.warn(`Component loading failed for ${componentPath}:`, error.message);
            return false;
        }
    }

    static async loadComponents(componentMap) {
        const promises = Object.entries(componentMap).map(([elementId, path]) => 
            this.loadComponent(elementId, path)
        );
        
        const results = await Promise.all(promises);
        const successCount = results.filter(Boolean).length;
        
        console.log(`✅ Loaded ${successCount}/${results.length} components`);
        return results;
    }

    static init() {
        // Component mapping
        const components = {
            'header-component': './components/shared/header.html',
            'hero-component': './components/sections/hero.html',
            'skills-component': './components/sections/skills.html',
            'footer-component': './components/shared/footer.html'
        };

        // Load on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadComponents(components));
        } else {
            this.loadComponents(components);
        }
    }
}

// Auto-initialize if not in module context
if (typeof module === 'undefined') {
    ComponentLoader.init();
}