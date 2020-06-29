
require 'uri'
require "net/https"
require 'json'

OSM_BASE_URL = 'https://api.openstreetmap.org/api/0.6'
TDCR_ID = 10724531
Relation = Struct.new(:id, :name, :description, :member_ids)
Way = Struct.new(:id, :name, :node_ids, :coordinates)

uri = URI.parse("#{OSM_BASE_URL}/relation/#{TDCR_ID}.json")

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER

response = http.request(Net::HTTP::Get.new(uri.request_uri))

relation = JSON.parse(response.body)['elements'].first
member_ids = relation['members'].map { |member| member['ref'] }
relation = Relation.new(relation['id'], relation['tags']['name'], relation['tags']['description'], member_ids)

uri = URI.parse("#{OSM_BASE_URL}/ways.json?ways=#{relation.member_ids.join(',')}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER
response = http.request(Net::HTTP::Get.new(uri.request_uri))

ways = JSON.parse(response.body)['elements']


ways.map! { |way|  Way.new(way['id'], way['tags']['name'], way['nodes']) }

ways.each do |way|
  uri = URI.parse("#{OSM_BASE_URL}/nodes.json?nodes=#{way.node_ids.join(',')}")
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  response = http.request(Net::HTTP::Get.new(uri.request_uri))
  nodes = JSON.parse(response.body)['elements']
  nodes.sort_by! { |node| way.node_ids.index(node['id']) }
  way.coordinates = nodes.map { |node| [node['lon'], node['lat']] }
end

def way_to_geojson(way)
  {
    type: 'Feature',
    properties: { name: way.name },
    geometry: {
      type: 'LineString',
      coordinates: way.coordinates
    }
  }
end

geojson = {
  type: 'FeatureCollection',
  features: ways.map { |way| way_to_geojson(way) }
}

File.open('TDCR.json', 'w') { |file| file.write(JSON.pretty_generate(geojson)) }

