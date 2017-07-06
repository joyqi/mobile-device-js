(function () {
    var canvas, gl, glRenderer, models,
        devices = {
            "Apple A7 GPU": {
                1136: ["iPhone 5", "iPhone 5s"],
                2048: ["iPad Air", "iPad Mini 2", "iPad Mini 3"]
            },

            "Apple A8 GPU": {
                1136: ["iPod touch (6th generation)"],
                1334: ["iPhone 6"],
                2001: ["iPhone 6 Plus"],
                2048: ["iPad Air 2", "iPad Mini 4"]
            },

            "Apple A9 GPU": {
                1136: ["iPhone SE"],
                1334: ["iPhone 6s"],
                2001: ["iPhone 6s Plus"],
                2224: ["iPad Pro (9.7-inch)"],
                2732: ["iPad Pro (12.9-inch)"]
            },

            "Apple A10 GPU": {
                1334: ["iPhone 7"],
                2001: ["iPhone 7 Plus"]
            }
        };

    function getCanvas() {
        if (canvas == null) {
            canvas = document.createElement('canvas');
        }

        return canvas;
    }

    function getGl() {
        if (gl == null) {
            gl = getCanvas().getContext('experimental-webgl');
        }

        return gl;
    }

    function getScreenWidth() {
        return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1);
    }

    function getGlRenderer() {
        if (glRenderer == null) {
            debugInfo = getGl().getExtension('WEBGL_debug_renderer_info');
            glRenderer = debugInfo == null ? 'unknown' : getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }

        return glRenderer;
    }

    function getModels() {
        if (models == null) {
            var device = devices[getGlRenderer()];

            if (device == undefined) {
                models = ['unknown'];
            } else {
                models = device[getScreenWidth()];

                if (models == undefined) {
                    models = ['unknown'];
                }
            }
        }

        return models;
    }

    if (window.MobileDevice == undefined) {
        window.MobileDevice = {};
    }

    window.MobileDevice.getGlRenderer = getGlRenderer;
    window.MobileDevice.getModels = getModels;
})();
