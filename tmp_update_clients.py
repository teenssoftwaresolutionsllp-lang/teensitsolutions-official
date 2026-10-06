import re
from pathlib import Path

files = [
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\__home__.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\about.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___big-data-analytics.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___collection-management.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___data-management.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___firewall-advance.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___handyman-app.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___internal-networking.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___product-engineering.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___property-simplified.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___research-energy.json'),
    Path(r'D:\Balaji Marpally\teensitsolutions-official\data\pages\portfolio___warranty-management.json'),
]

replacement = '''
                                                            <div class="slick-slide">
                            <div class="ct-client--image ">
                                <a href="#" style="display:flex; align-items:center; justify-content:center; min-height:64px; font-weight:700; color:#0f2a4d; text-decoration:none; font-size:18px; letter-spacing:0.02em; text-align:center; line-height:1.2;">
                                    <span>
                                        <span style="display:block;">Diya soaps</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                                                            <div class="slick-slide">
                            <div class="ct-client--image ">
                                <a href="#" style="display:flex; align-items:center; justify-content:center; min-height:64px; font-weight:700; color:#0f2a4d; text-decoration:none; font-size:17px; letter-spacing:0.02em; text-align:center; line-height:1.2;">
                                    <span>
                                        <span style="display:block;">Meat In Minutes</span>
                                        <small style="display:block; font-size:11px; font-weight:600; opacity:0.85;">meat delivery app</small>
                                    </span>
                                </a>
                            </div>
                        </div>
                                                            <div class="slick-slide">
                            <div class="ct-client--image ">
                                <a href="#" style="display:flex; align-items:center; justify-content:center; min-height:64px; font-weight:700; color:#0f2a4d; text-decoration:none; font-size:18px; letter-spacing:0.02em; text-align:center; line-height:1.2;">
                                    <span>
                                        <span style="display:block;">Treeko</span>
                                        <small style="display:block; font-size:11px; font-weight:600; opacity:0.85;">Casting app</small>
                                    </span>
                                </a>
                            </div>
                        </div>
                                                            <div class="slick-slide">
                            <div class="ct-client--image ">
                                <a href="#" style="display:flex; align-items:center; justify-content:center; min-height:64px; font-weight:700; color:#0f2a4d; text-decoration:none; font-size:17px; letter-spacing:0.02em; text-align:center; line-height:1.2;">
                                    <span>
                                        <span style="display:block;">VNR Infra</span>
                                        <small style="display:block; font-size:11px; font-weight:600; opacity:0.85;">real estate website</small>
                                    </span>
                                </a>
                            </div>
                        </div>
                                                            <div class="slick-slide">
                            <div class="ct-client--image ">
                                <a href="#" style="display:flex; align-items:center; justify-content:center; min-height:64px; font-weight:700; color:#0f2a4d; text-decoration:none; font-size:17px; letter-spacing:0.02em; text-align:center; line-height:1.2;">
                                    <span>
                                        <span style="display:block;">WINC</span>
                                        <small style="display:block; font-size:11px; font-weight:600; opacity:0.85;">Lottery based SaaS</small>
                                    </span>
                                </a>
                            </div>
                        </div>
'''

pattern = re.compile(
    r'(<img loading="lazy" decoding="async" width="109" height="44" src="/wp-content/uploads/2021/10/v2-client5\.png" class="no-lazyload ct-client--imgmain image-one attachment-full" alt="">\s*<img loading="lazy" decoding="async" width="109" height="44" src="/wp-content/uploads/2021/10/v2-client5\.png" class="image-two attachment-full" alt="">\s*</a>\s*</div>\s*</div>\s*)(\s*</div>\s*</div>)',
    re.S,
)

for path in files:
    text = path.read_text(encoding='utf-8')
    updated, count = pattern.subn(r'\1' + replacement + r'\2', text, count=1)
    if count:
        path.write_text(updated, encoding='utf-8')
        print(f'UPDATED {path.name}')
    else:
        print(f'NOT_FOUND {path.name}')
