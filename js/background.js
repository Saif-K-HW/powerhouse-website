class Background {
    constructor() {
        this.container = document.getElementById('bg-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.objects = [];
        
        this.init();
        this.animate();
        this.handleResize();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 100;
        
        // Create 6 gigantic cubes
        for (let i = 0; i < 6; i++) {
            this.createCube();
        }
        
        // Slightly dimmer lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Reduced from 1.0
        this.scene.add(ambientLight);
        
        // Slightly dimmer colored lights
        const directionalLight1 = new THREE.DirectionalLight(0xff69b4, 1.2); // Reduced from 1.5
        directionalLight1.position.set(5, 5, 5);
        this.scene.add(directionalLight1);
        
        const directionalLight2 = new THREE.DirectionalLight(0x00bfff, 1.2); // Reduced from 1.5
        directionalLight2.position.set(-5, -5, 5);
        this.scene.add(directionalLight2);
        
        // Slightly dimmer point lights
        const pointLight1 = new THREE.PointLight(0xff69b4, 0.8); // Reduced from 1.0
        pointLight1.position.set(100, 100, 100);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x00bfff, 0.8); // Reduced from 1.0
        pointLight2.position.set(-100, -100, 100);
        this.scene.add(pointLight2);
        
        // Slightly dimmer front lights
        const frontLight1 = new THREE.PointLight(0xffffff, 0.7); // Reduced from 1.0
        frontLight1.position.set(0, 0, 200);
        this.scene.add(frontLight1);
        
        const frontLight2 = new THREE.PointLight(0xffffff, 0.7); // Reduced from 1.0
        frontLight2.position.set(0, 0, -200);
        this.scene.add(frontLight2);
    }
    
    createCube() {
        const size = 80;
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        // Slightly darker material
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x7c73ff, // Slightly darker base color
            metalness: 0.85,
            roughness: 0.05,
            transparent: true,
            opacity: 0.85, // Slightly more transparent
            side: THREE.DoubleSide,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            reflectivity: 1.0,
            envMapIntensity: 1.7, // Slightly reduced reflections
            emissive: 0x6c63ff,
            emissiveIntensity: 0.15 // Reduced glow
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // More spread out positions
        const positions = [
            { x: -200, y: 120, z: -80 },
            { x: 200, y: 120, z: -100 },
            { x: -180, y: -120, z: -120 },
            { x: 180, y: -120, z: -90 },
            { x: 0, y: 160, z: -150 },
            { x: 0, y: -160, z: -130 }
        ];
        
        const pos = positions[this.objects.length];
        cube.position.set(pos.x, pos.y, pos.z);
        
        // Initial rotation
        cube.rotation.x = Math.PI / 4;
        cube.rotation.y = Math.PI / 4;
        
        // Animation properties
        cube.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.008,
            y: (Math.random() - 0.5) * 0.008
        };
        cube.userData.floatSpeed = 0.0008;
        cube.userData.floatOffset = Math.random() * Math.PI * 2;
        cube.userData.originalY = cube.position.y;
        cube.userData.floatRange = 15;
        
        this.objects.push(cube);
        this.scene.add(cube);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.objects.forEach(cube => {
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            
            const floatY = Math.sin(Date.now() * 0.001 + cube.userData.floatOffset) * cube.userData.floatRange;
            cube.position.y = cube.userData.originalY + floatY;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Background();
});
