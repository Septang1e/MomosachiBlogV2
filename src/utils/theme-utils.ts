type HSLColor = {
    h: number; // 色相 (0-360)
    s: number; // 饱和度 (0-100)
    l: number; // 亮度 (0-100)
};

/**
 * 生成一个基于基础颜色的调色板
 * @param baseColor 基础颜色的十六进制字符串（如 "#3498db"）
 * @returns 一组相关颜色的数组（十六进制字符串）
 */
export function generateThemeColorSet(baseColor: string): string[] {
    // 转换基础颜色为 HSL
    const hsl: HSLColor = hexToHSL(baseColor);

    const palette: string[] = [];
    for (let i = -40; i <= 40; i += 20) { // 改变色相
        const newHue: number = (hsl.h + i + 360) % 360;
        palette.push(hslToHex(newHue, hsl.s, hsl.l));
    }

    // 调整亮度
    palette.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 100)));
    palette.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 0)));

    return palette;
}

/**
 * 将十六进制颜色转换为 HSL 格式
 * @param hex 十六进制颜色字符串（如 "#3498db"）
 * @returns 对应的 HSL 颜色对象
 */
function hexToHSL(hex: string): HSLColor {
    const r: number = parseInt(hex.slice(1, 3), 16) / 255;
    const g: number = parseInt(hex.slice(3, 5), 16) / 255;
    const b: number = parseInt(hex.slice(5, 7), 16) / 255;

    const max: number = Math.max(r, g, b);
    const min: number = Math.min(r, g, b);
    let h: number = 0;
    let s: number = 0;
    const l: number = (max + min) / 2;

    if (max !== min) {
        const d: number = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
}

/**
 * 将 HSL 颜色转换为十六进制颜色
 * @param h 色相 (0-360)
 * @param s 饱和度 (0-100)
 * @param l 亮度 (0-100)
 * @returns 对应的十六进制颜色字符串
 */
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c: number = (1 - Math.abs(2 * l - 1)) * s;
    const x: number = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m: number = l - c / 2;
    let r: number = 0, g: number = 0, b: number = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
