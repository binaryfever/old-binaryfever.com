require "rubygems"
require "rspec"
require "watir-webdriver"

describe "binaryfever.com" do
  let(:browser){ @browser ||= Watir::Browser.new :firefox }

  before{ browser.goto "file:///Users/fred/Development/binaryfever.com/index.html"}
  after{ browser.close }

  it "should be a valid URL" do
    browser.text.should_not include ('The requested URL could not be retrieved')
  end

  it "should open about section when about link is clicked" do
	browser.link(:id => "about_link").click
    browser.section(:id => "about").text.should include("About")
  end

  it "should open projects section when projects link is clicked" do
    browser.link(:id => "projects_link").click
    browser.section(:id => "projects").text.should include("Projects")
  end

  it "should open contact section when contact link is clicked" do
    browser.link(:id => "contact_link").click
    browser.section(:id=> "contact").text.should include("Contact")
  end

  it "should go to linked in profile" do
    browser.link(:href => "http://www.linkedin.com/in/fredmchale").click
    browser.window(:title => /.*LinkedIn*./).use do
      browser.url.should == "http://www.linkedin.com/in/fredmchale"
    end
  end
end
