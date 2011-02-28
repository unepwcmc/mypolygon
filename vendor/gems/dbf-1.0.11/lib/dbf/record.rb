module DBF
  class Record
    attr_reader :attributes
    delegate :columns, :to => :@table
    
    def initialize(table)
      @table, @data, @memo = table, table.data, table.memo
      initialize_values
      define_accessors
    end
    
    def ==(other)
      other.respond_to?(:attributes) && other.attributes == attributes
    end
    
    def to_a
      columns.map { |column| @attributes[column.name.underscore] }
    end
    
    private
    
    def define_accessors
      columns.each do |column|
        underscored_column_name = column.name.underscore
        unless respond_to?(underscored_column_name)
          self.class.send :define_method, underscored_column_name do
            @attributes[column.name.underscore]
          end
        end
      end
    end
    
    def initialize_values
      @attributes = columns.inject({}) do |hash, column|
        if column.type == 'M'
          starting_block = unpack_data(column.length).to_i
          hash[column.name] = read_memo(starting_block)
          hash[column.name.underscore] = read_memo(starting_block)
        else
          value = unpack_data(column.length)
          hash[column.name] = column.type_cast(value)
          hash[column.name.underscore] = column.type_cast(value)
        end
        hash
      end
    end
  
    def unpack_data(length)
      @data.read(length).unpack("a#{length}").first
    end
  
    def read_memo(start_block)
      return nil if !@table.has_memo_file? || start_block < 1

      @table.memo_file_format == :fpt ? build_fpt_memo(start_block) : build_dbt_memo(start_block)
    end
    
    def build_fpt_memo(start_block)
      @memo.seek(start_block * memo_block_size)
      
      memo_type, memo_size, memo_string = @memo.read(memo_block_size).unpack("NNa*")
      return nil unless memo_type == 1 and memo_size > 0
      
      if memo_size > memo_block_content_size
        memo_string << @memo.read(memo_content_size(memo_size))
      else
        memo_string = memo_string[0, memo_size]
      end
      memo_string
    end
    
    def build_dbt_memo(start_block)
      @memo.seek(start_block * memo_block_size)
      
      case @table.version
      when "83" # dbase iii
        memo_string = ""
        loop do
          block = @memo.read(memo_block_size)
          memo_string << block
          break if block.rstrip.size < memo_block_size
        end
      when "8b" # dbase iv
        memo_type, memo_size = @memo.read(BLOCK_HEADER_SIZE).unpack("LL")
        memo_string = @memo.read(memo_size)
      end
      memo_string
    end
    
    def memo_block_size
      @memo_block_size ||= @table.memo_block_size
    end
    
    def memo_block_content_size
      memo_block_size - BLOCK_HEADER_SIZE
    end
    
    def memo_content_size(memo_size)
      (memo_size - memo_block_size) + BLOCK_HEADER_SIZE
    end
    
  end
end