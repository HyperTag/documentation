## Requirements

* git
* rvm
* Ruby 2.4.2
* Jekyll 2

## Setup

Verify that you have git installed.

`git -v`

Install RVM. Make sure you follow the final instructions to source the rvm command or restart your terminal after installation is complete.

`\curl -sSL https://get.rvm.io | bash`

Install a version of ruby and set it to the default version.

```
rvm install ruby-2.4.2
rvm use ruby-2.4.2 --default
```

Verify you have the correct version of ruby.

`ruby -v`

Install Jekyll.

`gem install jekyll bundler`

Clone the documentation site to your local machine to get started. 

`git clone https://github.com/astronomerio/documentation.git`

Change directories into the newly downloaded folder. 

`cd documentation`

Install any requirements for the project.

`bundle install`

Run a version of the site locally.

`jekyll serve`

## Where to edit

Remember that others make frequent changes to the site. It's best to `git pull` before you start making changes for the day. If you run into issues just ask for help in `#engineering` and someone can help you with issues.

The hompage is located in the `root` directory in `index.md`.

All additional content is located inside of the `v2` folder. 

Adding pages to the sidebar can be accomplished by editing `_data/sidebars/platform_sidebar.yml`

## How to embed images with relative paths

We're embedding ALL images and GIFs on these new docs using relative paths rather than absolute ones. This protects us in the event of a url change; we will not need to re-upload and reference each individual image or GIF.

Upload any image files with the appropriate names to https://github.com/astronomerio/documentation/tree/master/images

Once you have images in there, follow the guidelines below to reference them using a relative path in markdown:

Use `./` to reference the same level you are in, or `../` to go up a level. For example, let's say you are in `documentation/v2/airflow/best-practices.md`. To reference an image, you would type `../../images/{filename}.jpg`, because `images` is at the same level as `v2` . This command takes you up once to `v2`, then up again to root, then over to `/images/` then refrences the filename.



## Commiting your changes

To add your changes to the site. 
* Add your changes to git. 
* Check to make sure your changes were tracked. 
* Commit your code changes. Make sure to leave a nice message.
* Push your changes to github. 

```
git add .
git status
git commit -m "What did you change?"
git push origin master
```


## Going live!

[Astronomer Temp Doc Site](https://astronomerio.github.io/documentation/) 