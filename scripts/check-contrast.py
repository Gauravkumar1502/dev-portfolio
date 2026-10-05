#!/usr/bin/env python3
"""WCAG AA contrast check for every theme in src/styles/themes (run: pnpm check:contrast, -v for all rows).

Checks GUI text/muted/primary on background + surface, button text, border (3:1),
and terminal text/primary/accent/muted (text at 75% opacity) on the terminal background.
"""
import re,colorsys,sys
def parse(c):
    c=c.strip()
    if c.startswith('#'):
        h=c[1:]; h=''.join(x*2 for x in h) if len(h)==3 else h
        return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
    m=re.match(r'rgb\((\d+)\s+(\d+)\s+(\d+)\)',c)
    if m: return tuple(int(x)/255 for x in m.groups())
    m=re.match(r'hsl\(([\d.]+)(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\)',c)
    if m:
        h,s,l=(float(x) for x in m.groups()); return colorsys.hls_to_rgb(h/360,l/100,s/100)
    raise ValueError(c)
def lum(rgb):
    f=lambda v: v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    r,g,b=map(f,rgb); return 0.2126*r+0.7152*g+0.0722*b
def cr(a,b):
    la,lb=sorted((lum(a),lum(b)),reverse=True); return (la+0.05)/(lb+0.05)
def blend(fg,bg,a): return tuple(f*a+b*(1-a) for f,b in zip(fg,bg))
fails=0
def check(theme,label,fg,bg,need=4.5):
    global fails
    r=cr(fg,bg); ok=r>=need
    if not ok: fails+=1
    if not ok or '-v' in sys.argv: print(f"{'OK ' if ok else 'FAIL'} {theme:15} {label:26} {r:5.2f} (need {need})")
# GUI
gui=open('src/styles/themes/_gui.scss').read()
for name,body in re.findall(r"\[data-theme='(gui-[a-z]+)'\]\s*\{(.*?)\}",gui,re.S):
    v={k:parse(val) for k,val in re.findall(r'--([\w-]+):\s*([^;]+);',body) if k!='color-scheme'}
    bg,sf=v['color-bg'],v['nb-surface']
    for k in ['color-text','color-muted','color-primary']:
        check(name,f'{k} on bg',v[k],bg); check(name,f'{k} on surface',v[k],sf)
    check(name,'on-primary on primary',v['color-on-primary'],v['color-primary'])
    check(name,'border vs bg (UI 3:1)',v['nb-border'],bg,3)
# Terminal
t=open('src/styles/themes/_terminal.scss').read()
for name,vals in re.findall(r"'([\w-]+)':\s*\(\s*((?:(?:hsl\([^)]*\)|#[0-9a-fA-F]+)\s*,?\s*){4})\)",t):
    bg,text,pri,acc=[parse(x) for x in re.findall(r'hsl\([^)]*\)|#[0-9a-fA-F]+',vals)]
    check(name,'text',text,bg); check(name,'primary',pri,bg); check(name,'accent',acc,bg)
    check(name,'muted (text @ .75)',blend(text,bg,.75),bg)
print('failures:',fails)
sys.exit(1 if fails else 0)
