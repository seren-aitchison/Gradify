import sys, html, re
from html.parser import HTMLParser
class P(HTMLParser):
    def __init__(s): super().__init__(); s.out=[]; s.skip=0; s.inmain=False
    def handle_starttag(s,t,a):
        if t in('script','style'): s.skip+=1
        if t in('h1','h2','h3','h4','h5','li','p','tr','br','div'): s.out.append('\n')
        if t in('h2','h3','h4'): s.out.append('#'*int(t[1])+' ')
        if t=='li': s.out.append('- ')
    def handle_endtag(s,t):
        if t in('script','style'): s.skip-=1
    def handle_data(s,d):
        if not s.skip: s.out.append(d)
p=P(); p.feed(open(sys.argv[1],encoding='utf8').read())
t=re.sub(r'[ \t]+',' ',''.join(p.out)); t=re.sub(r'\n\s*\n+','\n',t)
print(t)
