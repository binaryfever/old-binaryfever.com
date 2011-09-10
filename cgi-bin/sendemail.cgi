#!/usr/bin/ruby
require 'rubygems'
require 'cgi'
require 'mail'
require 'json'

cgi = CGI.new

name = cgi['name']
email = cgi['email_from']
message = cgi['message']

mail = Mail.new do
  from     email
  to       'binaryfever@gmail.com'
  subject  "binaryfever.com email from #{name}"
  body     message
end

mail.delivery_method :sendmail

mail.deliver
cgi = CGI.new(:encoding => 'UTF-8')
print cgi.header('type' => 'application/x-javascript', 'charset' => 'UTF-8')
cgi.out(){
  '{ "success": "true" }'
}
