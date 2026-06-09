source "https://rubygems.org"

# Ruby 3.4 将部分标准库改为需显式安装的 gem，Jekyll 及其依赖需要以下
gem "base64"
gem "bigdecimal"
gem "csv"
gem "logger"
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw]
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

gem "github-pages", group: :jekyll_plugins

# Ruby 3.4 + Windows UCRT 需要较新版本才有预编译二进制，否则会编译失败
gem "nokogiri", ">= 1.16"

# Liquid 4.0.3 使用已移除的 tainted?，4.0.4+ 已修复，兼容 Ruby 3.2+
gem "liquid", ">= 4.0.4"
gem "webrick"

# If you want to use Jekyll native, uncomment the line below.
# To upgrade, run `bundle update`.

# gem "jekyll"

# gem "wdm", "~> 0.1.0" if Gem.win_platform?  # 在 Ruby 3.x Windows 上编译失败，可注释掉

# If you have any plugins, put them here!
group :jekyll_plugins do
  # gem "jekyll-archives"
  gem "jekyll-feed"
  gem 'jekyll-sitemap'
  gem 'hawkins'
end
