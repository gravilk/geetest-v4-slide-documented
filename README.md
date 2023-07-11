# GeeTest Slide documented & solved
This repository contains files that will help with solving Geetest challenges.
This solver worked on **July 11th 2023**. It is somewhat likely that something in the script has changed since then.
### Warning: This tool will break if Geetest adds more image challenges.

## How does Geetest work?
Geetest is a visual captcha with an image challenge. It collects near to no browser information.
Just a few IDs and the solution to the image challenge. To encrypt their validation request they use
both AES and RSA encryption. I assume this is only to make it harder to reverse engineer(?).
The image challenge supported in this repository is the slide challenge which is the most common one out of all of them.

## Ways to solve the image challenge
The first way you may think of is using AI to detect where the puzzle is on the image. You can make
the AI's job even easier by cropping the image to the Y position where the puzzle is at (Geetest tells you the Y position).
This is a good approach but not the one I used in this project.
I noticed that, in the image URL, you can see the date when the image was uploaded. It seems as though all of them are from ~2021 which would mean that they haven't been updated for ages.
This pushed me to scrape all the images and find how often duplicates occur. Turns out there's only about 1200 possible images for this captcha.
My next move was to calculate hashes of all of them and save them in a folder (along with the PNG).
Next, I wrote a script in Python tkinter to show me one image on the screen at a time and let me click where the puzzle is.
This is a kind of manual solving, but, after all I have to only do it 1,000 or so times.
You can see all the hashes along with the right answers in the `solve.py` file (Keep in mind you have to subtract about 40 from all the right answers to get the actual right answer. This is due to some odd offsets by Geetest).

## How to try this and continue development?
You can try this script by running `solve.py` after installing all the dependencies. You can also change the sitekey by changing the `captcha_id` variable.
In case this doesn't work you can continue development by using the partially deobfuscated script in `deobfuscated.js`. Feel free to check out the deobfuscator in `deobfuscate.js` (it's mostly string deobfuscation though).