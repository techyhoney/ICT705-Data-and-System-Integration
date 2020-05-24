from petl import fromcsv,fromxml,join,tocsv,look,convert

table1 = fromcsv('My_CSV.csv')


table2 = fromxml('Country_location.xml', './/tr', ('th', 'td'))

table3 = join(table1, table2, key='name')
table3 = convert(table3, 'name', 'upper')
table3 = convert(table3, 'name', 'replace', ' ', '')
look(table3)

tocsv(table3, 'covid_countries.csv')
