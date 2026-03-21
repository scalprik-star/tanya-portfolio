#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Генератор манифеста для портфолио Тани
С обновленными категориями
"""

import os
import json
from pathlib import Path

class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_color(text, color=Colors.RESET, bold=False):
    bold_prefix = Colors.BOLD if bold else ''
    print(f"{bold_prefix}{color}{text}{Colors.RESET}")

def get_image_files(folder):
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp')
    images = []
    
    if not os.path.exists(folder):
        return images
    
    for file in os.listdir(folder):
        if file.lower().endswith(valid_extensions) and not file.startswith('.'):
            images.append(file)
    
    return sorted(images)

def generate_manifest():
    print_color("\n🎨 ГЕНЕРАТОР МАНИФЕСТА ДЛЯ ПОРТФОЛИО ТАНИ", Colors.BLUE, bold=True)
    print_color("=" * 60, Colors.BLUE)
    
    # Все категории (обновленный список)
    categories = {
        'visits': 'Визитки',
        'logos': 'Логотипы',
        'infographics': 'Инфографика',
        'identity': 'Айдентика',
        'gift-certificates': 'Подарочные сертификаты',
        'illustrations': 'Иллюстрации',
        'postcards': 'Открытки',
        'maccards': 'Авторские мак-карты',
        'invitations': 'Приглашения',
        'handmade': 'Ручная работа',
        'social': 'Для соц.сетей',
        'guides': 'Оформление гайдов'
    }
    
    manifest = {}
    total_images = 0
    
    print_color("\n📁 Сканирую папки...\n", Colors.YELLOW)
    
    for cat_key, cat_name in categories.items():
        folder = f'images/{cat_key}'
        images = get_image_files(folder)
        
        if images:
            manifest[cat_key] = images
            count = len(images)
            total_images += count
            
            print_color(f"  {cat_name}:", Colors.GREEN, bold=True)
            for img in images:
                print_color(f"    • {img}", Colors.RESET)
            print_color(f"    └─ Всего: {count} шт.\n", Colors.GREEN)
        else:
            print_color(f"  {cat_name}: {Colors.RED}нет изображений{Colors.RESET}", Colors.YELLOW)
            os.makedirs(folder, exist_ok=True)
            print_color(f"    📂 Создана папка {folder}\n", Colors.BLUE)
    
    manifest_path = 'images/manifest.json'
    
    try:
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=4, ensure_ascii=False, sort_keys=True)
        
        print_color("=" * 60, Colors.GREEN)
        print_color(f"✅ МАНИФЕСТ УСПЕШНО СОЗДАН!", Colors.GREEN, bold=True)
        print_color(f"📄 Файл: {manifest_path}", Colors.GREEN)
        print_color(f"🖼️  Всего изображений: {total_images}", Colors.GREEN)
        
        if total_images == 0:
            print_color("\n⚠️  Добавь картинки в папки и запусти скрипт снова.", Colors.YELLOW, bold=True)
            
    except Exception as e:
        print_color(f"\n❌ Ошибка при сохранении: {e}", Colors.RED, bold=True)

if __name__ == "__main__":
    generate_manifest()