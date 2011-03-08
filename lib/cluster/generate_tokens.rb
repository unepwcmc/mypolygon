#CLUSTERING  OF PA'S FOR ABSTRACT AND RELATEDNESS MEASURES

#1) AIM: CREATE A DICTIONARY OF "BAD TERMS" TO EXCLUDE FROM FURTHER ANALYSIS
#   METHOD: TOKENISE ALL WORDS AND HISTOGRAM. SORT.
tokens = {}

pas = Pa.find_each( :select => 'DISTINCT name_eng, gid', :batch_size => 100 ) do |p|
  p.name_eng.split(/\W/).each do |t|
    tokens[t] ||=0
    tokens[t] += 1
  end
end
sorted_tokens = tokens.sort {|a,b| b[1]<=>a[1]}

puts sorted_tokens.inspect


#2) decide how to split histogram dictionary to remove common words - idea: use second derivative to determine threshold. this step is incredibly neccessary. looking through the data there are many examples of use/not use of typical feature class names in the pa names, eg ozero in russian means lake. lots of pa's with ozero in the name.

#3) tokenise name eng, remove bad tokens determined in #2

#4) generate double metaphones for each token and store with gid. double metaphone gives us a best attempt at classifying/simplifying words for similarity comparison. it is suitable for comparing the same word in many languages http://en.wikipedia.org/wiki/double metaphone. is more suitable than other indeces of similarity, eg soundex & levenstein as these are usualy targetted at english only.

#5) select nearby pa's only < 50km? buffer and distance. would love to use new postgis 1.5 geography support for this

#6) create proximity matrix using tanimoto similarity index on metaphone sets (ratio of intersects vs total union of 2. tanimoto is discussed in collective intelligence book, but is dead simple)

#7) cluster based on threshold

# key issues for clustering. all clustering methods are going to depend on us feeding some sort of "stop criterion"

# k-means. no as we need to know number of clusters to generate - could use sum total of natioal parks? guesing though.
# hierachical clustering.  we need to know either at how many, or at what range apart clustering stops
# c-means. again, decide on stop
# qt clusters. determine a maximum diameter for each cluster 
# there were others but i didn't bookmark them.

#(k-means and hierachical clustering are covered in the collective intelligence book)
#more info on working out sensible k's here: http://en.wikipedia.org/wiki/determining the number of clusters in a data set